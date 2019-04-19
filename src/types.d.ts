/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/4/19
 **/

declare module namespace {



  export interface Key {
    Id: string;
  }



  export interface OModel{
    $:Key,
    "a:ObjectID": string[];
    "a:Name": string[];
    "a:Code": string[];
    "a:CreationDate":string[];
    "a:Creator":string[];
    "a:ModificationDate":string[];
    "a:Modifier": string[];
    "a:PackageOptionsText":string[];
    "a:ModelOptionsText":string[];
    "a:ExtendedAttributesText":string[];
    "c:DBMS":OShortcut[];
    "c:Tables":{
      "o:Table":OTable[];
    };
    //TODO
    "c:PhysicalDiagrams":{"o:PhysicalDiagram":OPhysicalDiagram[]}[];
    "c:DefaultDiagram":{
      "o:PhysicalDiagram":KeyRef[],
    };
    "c:Users":{
      "o:User":OUser[]
    }[];
    "c:References":{
      "o:Reference":[]
    }[];
    "c:DefaultGroups":null;
    "c:ChildTraceabilityLinks":null;
    "c:TargetModels":null;
  }


  export interface OUser {
    $: Key;
    "a:ObjectID": string[];
    "a:Name": string[];
    "a:Code": string[];
    "a:CreationDate": string[];
    "a:Creator": string[];
    "a:ModificationDate": string[];
    "a:Modifier": string[];
  }


  export interface OTableSymbol {
    $: Key;
    "a:ModificationDate": string[];
    "a:IconMode": string[];
    "a:Rect": string[];
    "a:LineColor": string[];
    "a:FillColor": string[];
    "a:ShadowColor": string[];
    "a:FontList": string[];
    "a:BrushStyle": string[];
    "a:GradientFillMode": string[];
    "a:GradientEndColor": string[];
    "c:Object": {"o:Table":{$:KeyRef}}[];
    "a:CreationDate": string[];
  }

  export interface OPhysicalDiagram {
    $: Key;
    "a:ObjectID": string[];
    "a:Name": string[];
    "a:Code": string[];
    "a:CreationDate": string[];
    "a:Creator": string[];
    "a:ModificationDate": string[];
    "a:Modifier": string[];
    "a:DisplayPreferences": string[];
    "a:PaperSize": string[];
    "a:PageMargins": string[];
    "a:PaperSource": string[];
    "c:Symbols": {
      "o:TableSymbol": OTableSymbol[];
    }[];
  }



  export interface OShortcut {
    $: Key;
    "a:ObjectID": string[];
    "a:Name": string[];
    "a:Code": string[];
    "a:CreationDate": string[];
    "a:Creator": string[];
    "a:ModificationDate": string[];
    "a:Modifier": string[];
    "a:TargetStereotype": string[];
    "a:TargetID": string[];
    "a:TargetClassID": string[];
  }



  export interface OTable {
    $: Key;
    "a:ObjectID": string[];
    "a:Name": string[];
    "a:Code": string[];
    "a:CreationDate": string[];
    "a:Creator": string[];
    "a:ModificationDate": string[];
    "a:Modifier": string[];
    "a:Comment": string[];
    "a:TotalSavingCurrency": string[];
    "c:Columns": CColumn[];
    "c:Keys": CKey[];
    "c:Owner": COwner[];
    "c:PrimaryKey": CPrimaryKey[];
  }


  export interface OColumn {
    $: Key;
    "a:ObjectID": string[];
    "a:Name": string[];
    "a:Code": string[];
    "a:CreationDate": string[];
    "a:Creator": string[];
    "a:ModificationDate": string[];
    "a:Modifier": string[];
    "a:DataType": string[];
    "a:Length": string[];
    "a:Identity": string[];
    "a:Column.Mandatory": string[];
    "a:Comment": string[];
    "a:ExtendedAttributesText": string[];
  }

  export interface CColumn {
    "o:Column": OColumn[];
  }

  export interface KeyRef {
    $: {
      Ref: string;
    };
  }

  export interface CKeyColumn {
    "o:Column": KeyRef[];
  }

  export interface OKey {
    $: Key;
    "a:ObjectID": string[];
    "a:Name": string[];
    "a:Code": string[];
    "a:CreationDate": string[];
    "a:Creator": string[];
    "a:ModificationDate": string[];
    "a:Modifier": string[];
    "a:ConstraintName": string[];
    "c:Key.Columns": CKeyColumn[];
  }

  export interface CKey {
    "o:Key": OKey[];
  }

  export interface COwner {
    "o:User": {
      $ : KeyRef;
    }[];
  }

  export interface OKey2 {
    $: KeyRef;
  }

  export interface CPrimaryKey {
    "o:Key": OKey2[];
  }
}

