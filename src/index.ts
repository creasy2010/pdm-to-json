const removeDiacritics = require('./removeDiacritics');
const util = require('util');
const parser = require('xml2js');
const fs = require('fs');
import * as fse from "fs-extra";
const parseString = util.promisify(parser.parseString);
const rtfToHTMLLib = util.promisify(require('@iarna/rtf-to-html').fromString);

import {join} from "path";

export async function parse(fileName=join(__dirname,'../S2B.pdm')) {

  let content  = await fse.readFile(fileName, 'utf8');
  //Tip: 把json中 a:XXX c:XXX o:XXX转换为 aXXX cXXX oXXX ts类型提示添加上来.
  let PdbJson:{Model:PDB.IModel} = await parseString(content.replace(/"([aco(xmlns)]):/ig,'"$1'));
  let results  =  await getPdmInfo(PdbJson);
  console.log(results);
}


async function getPdmInfo(parsedJson:{Model:PDB.IModel}) {
  // fse.writeJSONSync(join(__dirname,'out.json'),parsedJson);
  // console.log(JSON.stringify(parsedJson));
    const model:PDB.IOModel = parsedJson.Model.oRootObject[0].cChildren[0].oModel[0];
    const tables = model.cTables[0].oTable;

    const parsedModel = {};

    for (const table of tables) {

        const ref = table.$.Id;
        const name = codify(table.aName[0]);
        const code = table.aCode[0];
        const constantName = codifyUpper(table.aName[0]);
        const conceptualName = table.aName[0];
        const comment = table.aComment;
        const description = await rtfToHTML(table.aDescription);
        const primaryKeyArray = table.cPrimaryKey[0].oKey;
        const columns = await getColumns(table);
        const keys = getKeys(table, primaryKeyArray, columns);

        parsedModel[code] = {
            ref,
            name,
            code,
            constantName,
            conceptualName,
            comment,
            description,
            columns,
            keys
        };
    }

    for (const tableCode in parsedModel) {
        const table = parsedModel[tableCode];
        table.inRelations = [];
        table.outRelations = [];
        const inReferences = model.cReferences[0].oReference.filter(r => r.cChildTable[0].oTable[0].$.Ref=== table.ref);
        const outReferences = model.cReferences[0].oReference.filter(r => r.cParentTable[0].oTable[0].$.Ref === table.ref);

        mapInRelations(inReferences, parsedModel, table);
        mapOutRelations(outReferences, parsedModel, table);
    }

    return parsedModel;
}

function mapInRelations(inReferences:PDB.OReference[], parsedModel, table) {
    for (const reference of inReferences) {

        const parentTable = findTableByRef(parsedModel, reference.cParentTable[0].oTable[0].$.Ref);
        const parentColumnRef = reference.cJoins[0].oReferenceJoin[0].cObject1[0].oColumn[0].$.Ref;
        const childColumnRef = reference.cJoins[0].oReferenceJoin[0].cObject2[0].oColumn[0].$.Ref;
        table.inRelations.push({
            name: reference.aName[0],
            code: reference.aCode[0],
            cardinality: reference.aCardinality[0],
            parentRole: reference.aParentRole[0],
            childRole: reference.aChildRole[0],
            parentTable: parentTable.conceptualName,
            parentColumn: findColumnByRef(parentTable, parentColumnRef)['conceptualName'],
            childTable: table.conceptualName,
            childColumn: findColumnByRef(table, childColumnRef)['conceptualName']
        });
    }
}

function mapOutRelations(outReferences, parsedModel, table) {
    for (const reference of outReferences) {
        const childTable = findTableByRef(parsedModel, reference.cChildTable[0].oTable[0].$.Ref);
        const parentColumnRef = reference.cJoins[0].oReferenceJoin[0].cObject1[0].oColumn[0].$.Ref;
        const childColumnRef = reference.cJoins[0].oReferenceJoin[0].cObject2[0].oColumn[0].$.Ref;
        table.outRelations.push({
            name: reference.aName[0],
            code: reference.aCode[0],
            cardinality: reference.aCardinality[0],
            parentRole: reference.aParentRole[0],
            childRole: reference.aChildRole[0],
            parentTable: table.conceptualName,
            parentColumn: findColumnByRef(table, parentColumnRef)['conceptualName'],
            childTable: childTable.conceptualName,
            childColumn: findColumnByRef(childTable, childColumnRef)['conceptualName']
        });
    }
}

function getKeys(table:PDB.OTable, primaryKeyArray, columns) {
    return table.cKeys[0].oKey.map(key => {
        const ref = key.$.Id;
        const name = key.aName[0];
        const code = key.aCode[0];
        const isPrimaryKey = !!primaryKeyArray.find(k => k.$.Ref == key.$.Id);
        const columnsKey =  getColumnsKey(key, columns, isPrimaryKey);
        return { ref, name, code, isPrimaryKey, columnsKey };
    });
}

function getColumnsKey(key, columns, isPrimaryKey) {
    return key.cKey.Columns[0].oColumn.map(cKey => {
        const column = columns.find(c => c.ref === cKey.$.Ref);
        column.isPrimaryKey = isPrimaryKey;
        return {
            name: column.name,
            code: column.code,
            conceptualName: column.conceptualName
        };
    });
}

async function getColumns(table:PDB.OTable):Promise<PDBTrans.IColumn[]>{
    return await Promise.all(table.cColumns[0].oColumn.map(async (column:PDB.OColumn) => {
        return {
            ref: column.$.Id,
            name: codify(column.aName[0]),
            code: column.aCode[0],
            constantName: codifyUpper(column.aName[0]),
            conceptualName: column.aName[0],
            description: await rtfToHTML(column.aDescription),
            dataType: column.aDataType[0],
            isIdentity: column.aIdentity ? !!Number(column.aIdentity[0]) : false,
            isMandatory: column['aColumn.Mandatory'] ? !!Number(column['aColumn.Mandatory'][0]) : false,
            isPrimaryKey: false,//TODO 为什么这里是写死的.
            length: column.aLength && column.aLength.length ? column.aLength[0] : null,
          //@ts-ignore TODO
            listOfValues: column.aListOfValues && column.aListOfValues.length ? extractListOfValues(column.aListOfValues[0]) : null,
          //@ts-ignore TODO
            precision: column.aPrecision && column.aPrecision.length ? column.aPrecision[0] : null,
          //@ts-ignore TODO
          defaultValue: column.aDefaultValue && column.aDefaultValue.length ? column.aDefaultValue[0] : null
        };
    }));
}

async function rtfToHTML(arr) {
    try {
        if (arr && arr.length) {
            return await rtfToHTMLLib(arr[0]);
        }
    } catch (error) {
        return await arr;
    }
}

function codify(str) {
    return removeDiacritics(str)
        .replace(/ /g, "")
        .replace(/\W/g, "");
}

function extractListOfValues(str) {
    return str.split('\r\n').map(s => {
        const elements = s.split('\t');
        const obj:any = {};
        obj.code = elements[0];
        obj.name = elements[1];
        obj.constantName = removeDiacritics(elements[1])
            .toUpperCase()
            .replace(/ /g, "_")
            .replace(/\W/g, "");

        return obj;
    });
}

function codifyUpper(str) {
    return removeDiacritics(str)
        .toUpperCase()
        .replace(/ /g, "_")
        .replace(/\W/g, "");
}

function findColumnByRef(parsedTable, ref) {
    return parsedTable.columns.find(c => c.ref === ref);
}

function findTableByRef(parsedModel, ref) {
    for (const key in parsedModel) {
        if (parsedModel[key].ref === ref) {
            return parsedModel[key];
        }
    }
}


parse();