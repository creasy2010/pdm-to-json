/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/4/19
 **/

declare module PDB {

  export interface IModel{
    $:{
      //终于明白aco的含义了
      xmlnsa:"attribute",
      xmlnsc:"collection",
      xmlnso:"object",
    };
    oRootObject:{
      $:KeyRef;
      cChildren:{
        oModel:IOModel[]
      }[];
    }[]

  }

  export interface Key {
    Id: string;
  }

  export interface IOModel{
    $:Key,
    "aObjectID": string[];
    "aName": string[];
    "aCode": string[];
    "aCreationDate":string[];
    "aCreator":string[];
    "aModificationDate":string[];
    "aModifier": string[];
    "aPackageOptionsText":string[];
    "aModelOptionsText":string[];
    "aExtendedAttributesText":string[];
    "cDBMS":OShortcut[];
    "cTables":{
      "oTable":OTable[];
    }[];
    "cPhysicalDiagrams":{"oPhysicalDiagram":OPhysicalDiagram[]}[];
    "cDefaultDiagram":{
      "oPhysicalDiagram":KeyRef[],
    };
    "cUsers":{
      "oUser":OUser[]
    }[];
    "cReferences":{
      "oReference":OReference[]
    }[];
    "cDefaultGroups":{
      "oGroup":OGroup[],
    }[];
    "cChildTraceabilityLinks":{
      "oExtendedDependency":OExtendedDependency[]
    }[];
    "cTargetModels":{
      "oTargetModel":OTargetModel[]
    }[];
  }



  export interface OTargetModel {
    $: Key;
    "aObjectID": string[];
    "aName": string[];
    "aCode": string[];
    "aCreationDate": string[];
    "aCreator": string[];
    "aModificationDate": string[];
    "aModifier": string[];
    "aTargetModelURL": string[];
    "aTargetModelID": string[];
    "aTargetModelClassID": string[];
    "aTargetModelLastModificationDate": string[];
    "cSessionShortcuts": {
      "oShortcut":KeyRef[]
    }[];
  }



  export interface OExtendedDependency {
    $: Key;
    "aObjectID": string[];
    "aCreationDate": string[];
    "aCreator": string[];
    "aModificationDate": string[];
    "aModifier": string[];
    "cObject1": {
      "oTable":KeyRef[]
    }[];
    "cObject2": {
      "oTable":KeyRef[]
    }[];
  }

  export interface OGroup {
    $: Key;
    "aObjectID": string[];
    "aName": string[];
    "aCode": string[];
    "aCreationDate": string[];
    "aCreator": string[];
    "aModificationDate": string[];
    "aModifier": string[];
    "cGroup.Users": {
      "oUser":KeyRef[]
    }[];
  }




  export interface OColumnRef {
    "oColumn": KeyRef[];
  }

  export interface OReferenceJoin {
    $: Key;
    "aObjectID": string[];
    "aCreationDate": string[];
    "aCreator": string[];
    "aModificationDate": string[];
    "aModifier": string[];
    "cObject1": OColumnRef[];
    "cObject2": OColumnRef[];
  }
  //
  // export interface CJoin {
  //   o:ReferenceJoin: OReferenceJoin[];
  // }

  export interface OReference {
    $: Key;
    "aObjectID": string[];
    "aName": string[];
    "aCode": string[];
    "aCreationDate": string[];
    "aCreator": string[];
    "aModificationDate": string[];
    "aModifier": string[];
    "aForeignKeyConstraintName": string[];
    "aCardinality": string[];
    "cParentTable": {
      "oTable":KeyRef[]
    }[];
    "cChildTable": {
      "oTable":KeyRef[]
    }[];
    "cParentKey": {
      "akey":KeyRef[]
    }[];
    "cJoins": OReferenceJoin[];
  }


  export interface OUser {
    $: Key;
    "aObjectID": string[];
    "aName": string[];
    "aCode": string[];
    "aCreationDate": string[];
    "aCreator": string[];
    "aModificationDate": string[];
    "aModifier": string[];
  }


  export interface OTableSymbol {
    $: Key;
    "aModificationDate": string[];
    "aIconMode": string[];
    "aRect": string[];
    "aLineColor": string[];
    "aFillColor": string[];
    "aShadowColor": string[];
    "aFontList": string[];
    "aBrushStyle": string[];
    "aGradientFillMode": string[];
    "aGradientEndColor": string[];
    "cObject": {"oTable":{$:KeyRef}}[];
    "aCreationDate": string[];
  }

  export interface OPhysicalDiagram {
    $: Key;
    "aObjectID": string[];
    "aName": string[];
    "aCode": string[];
    "aCreationDate": string[];
    "aCreator": string[];
    "aModificationDate": string[];
    "aModifier": string[];
    "aDisplayPreferences": string[];
    "aPaperSize": string[];
    "aPageMargins": string[];
    "aPaperSource": string[];
    "cSymbols": {
      "oTableSymbol": OTableSymbol[];
    }[];
  }



  export interface OShortcut {
    $: Key;
    "aObjectID": string[];
    "aName": string[];
    "aCode": string[];
    "aCreationDate": string[];
    "aCreator": string[];
    "aModificationDate": string[];
    "aModifier": string[];
    "aTargetStereotype": string[];
    "aTargetID": string[];
    "aTargetClassID": string[];
  }



  export interface OTable {
    $: Key;
    "aObjectID": string[];
    "aName": string[];
    "aCode": string[];
    "aCreationDate": string[];
    "aCreator": string[];
    "aModificationDate": string[];
    "aModifier": string[];
    "aComment": string[];
    "aDescription": string[];
    "aTotalSavingCurrency": string[];
    "cColumns": CColumn[];
    "cKeys": CKey[];
    "cOwner": COwner[];
    "cPrimaryKey": CPrimaryKey[];
  }


  export interface OColumn {
    $: Key;
    "aObjectID": string[];
    "aName": string[];
    "aCode": string[];
    "aCreationDate": string[];
    "aCreator": string[];
    "aModificationDate": string[];
    "aModifier": string[];
    "aDataType": string[];
    "aLength": string[];
    "aIdentity": string[];
    "aColumn.Mandatory": string[];
    "aComment": string[];
    "aExtendedAttributesText": string[];
  }

  export interface CColumn {
    "oColumn": OColumn[];
  }

  export interface KeyRef {
    $: {
      Ref: string;
    };
  }

  export interface CKeyColumn {
    "oColumn": KeyRef[];
  }

  export interface OKey {
    $: Key;
    "aObjectID": string[];
    "aName": string[];
    "aCode": string[];
    "aCreationDate": string[];
    "aCreator": string[];
    "aModificationDate": string[];
    "aModifier": string[];
    "aConstraintName": string[];
    "cKey.Columns": CKeyColumn[];
  }

  export interface CKey {
    "oKey": OKey[];
  }

  export interface COwner {
    "oUser": {
      $ : KeyRef;
    }[];
  }

  export interface OKey2 {
    $: KeyRef;
  }

  export interface CPrimaryKey {
    "oKey": OKey2[];
  }
}

