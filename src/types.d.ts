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
//
// export interface 4 {
//     Ref: string;
//   }

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

// export interface 5 {
//     Ref: string;
//   }

  export interface OUser {
    $: KeyRef;
  }

  export interface COwner {
    "o:User": OUser[];
  }

  export interface OKey2 {
    $: KeyRef;
  }

  export interface CPrimaryKey {
    "o:Key": OKey2[];
  }
}

