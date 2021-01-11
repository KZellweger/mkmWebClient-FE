import React from 'react';
import StockService from "../services/StockService";

import { forwardRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import MaterialTable from "material-table";
import {AddBox,ArrowDownward,Check,ChevronLeft,ChevronRight,Clear,DeleteOutline,Edit,FilterList,FirstPage,LastPage,Remove,SaveAlt,Search,ViewColumn}  from '@material-ui/icons';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';


//https://material-ui.com/components/material-icons/
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  SaveTwoToneIcon: forwardRef((props, ref) => <SaveTwoToneIcon {...props} ref={ref} />),
  TextField: forwardRef((props, ref) => <TextField {...props} ref={ref} />),
};


//https://github.com/effiongcharles/material-ui-table-crud-restapi
//https://material-table.com/
class StockComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
//            stock: [{"articleId": 361168434,"languageCode": "en","comment": "loading","price": 6.48,"quantity": 1,"product": {"productId": 283553,"name": "TESTHangarback Walker","categoryId": 1,"categoryName": "TESTMagic Single","imageUrl": "TEST./img/items/1/ORI/283553.jpg","game": "MTG","expansionCollectionNumber": "229","rarity": "Rare","expansionName": "Magic Origins",}},],
            stock: [],
            columns: [
                      {title: "id", field: "articleId", hidden: true},
                      {title: "Kartenname", field: "product.name", editable:'never'},
                      {title: "Neuer Preis", field: "price", editable: true, type: 'currency', currencySetting:{ locale: 'de',currencyCode:'Eur', minimumFractionDigits:0, maximumFractionDigits:2}, cellStyle: {width: 150,minWidth: 150}},
                      {title: "Akt. Preis", field: "articlePriceEntity.price", editable:'never', type: 'currency', currencySetting:{locale: 'de',currencyCode:'Eur', minimumFractionDigits:0, maximumFractionDigits:2}},
                      {title: "Kommentar", field: "comment", editable: true, initialEditValue: 'intial comment', defaultValue: "default comment", cellStyle: {width: 250,minWidth: 250},
                        render: rowData => {if (rowData.comment) return (<div style={{textAlign: 'left',width: 250}}>{rowData.comment}</div>); else return (<div style={{textAlign: 'left', opacity: 0.1, width: 250}}>{"Kommentarplatzhalter"}</div>)}},
                      {title: "quantity", field: "quantity", editable: 'never', type: 'numeric'},
                      {title: "condition", field: "condition", editable:'never'},
                      {title: "expansion", field: "product.expansionName", editable:'never'},
                      {title: "language", field: "languageCode", editable:'never'},
                      {title: "foil", field: "foil", editable:'never', type: 'boolean'},
                      {title: "signed", field: "signed", editable:'never', type: 'boolean'},
                      {title: "altered", field: "altered", editable:'never', type: 'boolean'},
                      {title: "playset", field: "playset", editable:'never', type: 'boolean'},
                      {title: "Rarity", field: "product.rarity", editable:'never'},
                      {title: "imageUrl", field: "product.imageUrl", editable:'never',
                      render: rowData => {return (<div><Link href={`https://sandbox.cardmarket.com${rowData.product.imageUrl.substring(1)}`} activeClassName="current">{rowData.product.imageUrl}</Link></div>);}},
                      {title: "game", field: "product.game", editable:'never'},
                      {title: "Collection Number", field: "product.expansionCollectionNumber", editable:'never'},
                      {title: "Product Id", field: "product.productId", editable:'never'},
                      {title: "Article Id", field: "articleId", editable: 'never'},
                      ],
            title: "Mein Stock",
            localization: {body: {
                           emptyDataSourceMessage: 'Keine Einträge',
                           addTooltip: 'Hinzufügen',
                           deleteTooltip: 'Löschen',
                           editTooltip: 'Bearbeiten',
                           filterRow: {
                             filterTooltip: 'Filter'
                           },
                           editRow: {
                             deleteText: 'Diese Zeile wirklich löschen?',
                             cancelTooltip: 'Abbrechen',
                             saveTooltip: 'Speichern'
                           }
                         },
                         grouping: {
                           placeholder: 'Spalten ziehen ...',
                           groupedBy: 'Gruppiert nach:'
                         },
                         header: {
                           actions: 'Aktionen'
                         },
                         pagination: {
                           labelDisplayedRows: '{from}-{to} von {count}',
                           labelRowsSelect: 'Zeilen',
                           labelRowsPerPage: 'Zeilen pro Seite:',
                           firstAriaLabel: 'Erste Seite',
                           firstTooltip: 'Erste Seite',
                           previousAriaLabel: 'Vorherige Seite',
                           previousTooltip: 'Vorherige Seite',
                           nextAriaLabel: 'Nächste Seite',
                           nextTooltip: 'Nächste Seite',
                           lastAriaLabel: 'Letzte Seite',
                           lastTooltip: 'Letzte Seite'
                         },
                         toolbar: {
                           addRemoveColumns: 'Spalten hinzufügen oder löschen',
                           nRowsSelected: '{0} Zeile(n) ausgewählt',
                           showColumnsTitle: 'Zeige Spalten',
                           showColumnsAriaLabel: 'Zeige Spalten',
                           exportTitle: 'Export',
                           exportAriaLabel: 'Export',
                           exportName: 'Export als CSV',
                           searchTooltip: 'Suche',
                           searchPlaceholder: 'Suche'
                         }
                       }
      }
    }

      componentDidMount() {
            StockService.getStockInformation().then((response) => {
                console.log(response.data)
                this.setState({stock: response.data})
            });
        }
//currencySetting
  render() {
    return (
      <MaterialTable
        title={this.state.title}
        columns={this.state.columns}
        data={this.state.stock}
        localization={this.state.localization}
        icons={tableIcons}
        handleChange={this.handleChange}
        tableLayout='fixed'
        options={{
          pageSize: 8,
          exportButton: true,
          exportAllData: true,
          selection: true,
          filtering: true,
          headerStyle: {textAlign:'left'},
        }}
         actions={[
                {
                  tooltip: 'send selected to MKM',
                  icon: () => <SaveTwoToneIcon />,
                  onClick: (evt, data) => StockService.postArticles(data).then((response) => {
                                                          console.log(response.data)
                                                          this.setState({stock: response.data})
                                                      })
                }
              ]}
        cellEditable={{
          cellStyle: {padding: 0 },
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 500);
              this.setState((prev) => {
                              rowData[columnDef.field] = newValue;
                              return {
                                ...prev,
                                stock: prev.stock
                              };
                            });
            });
          }
        }}
      />
    );
  }
}

  export default StockComponent
