import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import { Card,  Table} from "antd";
import moment from 'moment';
import SearchBox from "../../../components/SearchBox";
import IntlMessages from "../../../util/IntlMessages";
import {
    fetchInwardList
} from "../../../appRedux/actions/Inward";

function  List(props) {

    const [sortedInfo, setSortedInfo] = useState({
        order: 'descend',
        columnKey: 'age',
    });
    const [filteredInfo, setFilteredInfo] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [filteredInwardList, setFilteredInwardList] = useState(props.inward.inwardList);
       
const getFilterData=(list)=>{
    let filter = list.map(item =>{
    if(item.instruction.length>0){
        item.children = item.instruction.filter(filteredInfo => filteredInfo.status.statusName ==='IN PROGRESS');
    }
      return item
     })
    return filter;
}
    const columns = [{
        title: 'Coil Number',
        dataIndex: 'coilNumber',
        key: 'coilNumber',
        filters: [],
        sorter: (a, b) => a.coilNumber.length - b.coilNumber.length,
        sortOrder: sortedInfo.columnKey === 'coilNumber' && sortedInfo.order,
    },
    {
        title: 'Party Name',
        dataIndex: 'party.partyName',
        key: 'party.partyName',
        filteredValue: filteredInfo ? filteredInfo["party.partyName"] : null,
        onFilter: (value, record) => record.party.partyName == value,
        filters: props.inward.inwardList.length > 0 ? [...new Set(props.inward.inwardList.map(item => item.party.partyName))].map(partyName => ({ text: partyName, value: partyName })) : [],
        sorter: (a, b) => a.party.partyName.length - b.party.partyName.length,
        sortOrder: sortedInfo.columnKey === 'party.partyName' && sortedInfo.order,
    },
    {
        title: 'Inward Date',
        dataIndex: 'dReceivedDate',
        render (value) {
            return moment(value).format('Do MMM YYYY');
        },
        key: 'dReceivedDate',
        filters: [],
        sorter: (a, b) => a.dReceivedDate - b.dReceivedDate,
        sortOrder: sortedInfo.columnKey === 'dReceivedDate' && sortedInfo.order,
    },
    {
        title: 'Material',
        dataIndex: 'material.description',
        key: 'material.description',
        filteredValue: filteredInfo ? filteredInfo["material.description"] : null,
        onFilter: (value, record) => record.material.description == value,
        filters: props.inward.inwardList.length > 0 ? [...new Set(props.inward.inwardList.map(item => item.material.description))].map(material => ({ text: material, value: material })) : [],
        sorter: (a, b) => a.material.description.length - b.material.description.length,
        sortOrder: sortedInfo.columnKey === 'material.description' && sortedInfo.order,
    },
    {
        title: 'Status',
        dataIndex: 'status.statusName',
        key: 'status.statusName',
        filters:[] ,
        sorter: (a, b) => a.status.statusName.length - b.status.statusName.length,
        sortOrder: sortedInfo.columnKey === 'status.statusName' && sortedInfo.order,
    },
    {
        title: 'Thickness',
        dataIndex: 'fThickness',
        key: 'fThickness',
        filters: [],
        sorter: (a, b) => a.fThickness - b.fThickness,
        sortOrder: sortedInfo.columnKey === 'fThickness' && sortedInfo.order,
    },
    {
        title: 'Weight',
        dataIndex: 'fQuantity',
        key: 'fQuantity',
        filters: [],
        sorter: (a, b) => a.fQuantity - b.fQuantity,
        sortOrder: sortedInfo.columnKey === 'fQuantity' && sortedInfo.order,
    },
    {
        title:"Tags",
        dataIndex:"packetClassification.classificationName",
        key:"packetClassification.classificationName"
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text, record) => (
            <span>{record.instructionId ? <span className="gx-link"></span>:
            <span className="gx-link" onClick={() =>  props.history.push(`plan/${record.coilNumber}`)}>Finish</span>
            }
                
            </span>
        ),
    },
    ];

    useEffect(() => {
        props.fetchInwardList();
    }, []);

    useEffect(() => {
        if(!props.inward.loading && props.inward.success) {
            setFilteredInwardList(props.inward.inwardList);
        }
    }, [props.inward.loading, props.inward.success])

    useEffect(() => {
        if (searchValue) {
            const filteredData = props.inward.inwardList.filter((inward) => {
                if (inward.coilNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
                    inward.party.partyName.toLowerCase().includes(searchValue.toLowerCase()) ||
                    inward.customerBatchId?.toLowerCase().includes(searchValue?.toLowerCase()) ||
                    inward.inStockWeight === Number(searchValue) ||
                    inward.vInvoiceNo.toLowerCase().includes(searchValue.toLowerCase())) {
                    return inward
                }
            });
            
            setFilteredInwardList(getFilterData(filteredData));
        } else {
            setFilteredInwardList(getFilterData(props.inward.inwardList));
        }
    }, [searchValue])
    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
        setFilteredInfo(filters)
    };
    const handleRow = (record) => {
        console.log(record);
    };

    return (
        <div><h1><IntlMessages id="sidebar.company.workinprogress" /></h1>
        <Card>
            <div style={{width: "50%" ,"margin-bottom":"10px"}}className="gx-flex-row gx-flex-1 wip-search">
            <SearchBox styleName="gx-flex-1" placeholder="Search for coil number or party name..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
             
            </div>
            <Table rowSelection={[]}
                   className="gx-table-responsive"
                   columns={columns}
                   dataSource={filteredInwardList.filter(filteredInfo => filteredInfo.status.statusName ==='IN PROGRESS')}
                   onChange={handleChange}
                   onRow={(record, index) => {
                    return {
                      onClick: (record) => {handleRow(record)}
                    };
                  }}
            />
        </Card>
        </div>
    );
}

const mapStateToProps = state => ({
    inward: state.inward,
});


export default connect(mapStateToProps, {
    fetchInwardList
})(List);