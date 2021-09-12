pragma solidity >=0.5.0;


 //SPDX-License-Identifier: SimPL-2.0
 

contract Main {
     
    uint price1;
    
    address addr;
    uint public dataIndex;
    uint public dataIndexM;
    uint public dataIndexP;
    
    mapping(address => mapping(uint => Datastorage)) stores;
    mapping(uint => address) dataIdInStore;
   
    struct Datastorage{
        uint id;   //数据id
        string dataHex; //数据哈希
        address ad;
    }

    mapping(string =>Authstorage) auStores;
    //mapping(uint => address) dataIdInStoreAu;

    struct Authstorage {//申请存储
        uint id;
        string dataHex;
        address ad;
    }

    mapping(address => mapping(uint => Medicstorage)) mStores;
    mapping(string => Medicstorage) mStores2;
    mapping(uint => address) dataIdInStoreM;
    
    struct Medicstorage{//电子病历存储
        uint id;   //数据id
        string dataHex;//数据哈希
        address ad;
    }

    mapping(string => Prescription) pStores;
    mapping(uint => address) dataIdInStoreP;
   
    struct Prescription{//处方单
        uint id;   //数据id
        string dataHex;//数据哈希
        address ad;
    }


    function Store() public {
        dataIndex = 0;
        dataIndexM = 0;
        dataIndexP = 0;

       addr = msg.sender;
       
    }
 
     
//     function addDataToStore(string memory dataHex ) public {
//        dataIndex += 1 ;
//        Datastorage memory data = Datastorage(dataIndex,dataHex,addr) ;
//        stores[msg.sender][dataIndex]=data;
//        dataIdInStore[dataIndex] = msg.sender;
//    }

//存储数据
   function addMedicDataToStore(string memory identity, string memory dataHex ) public {
       dataIndex += 1 ;
       Medicstorage memory data = Medicstorage(dataIndex,dataHex,addr) ;
       mStores2[identity]=data;
      // dataIdInStoreM[dataIndex] = msg.sender;
   }

    function addPrescriptionDataToStore(string memory identity,  string memory dataHex ) public {
       dataIndex += 1 ;
       Prescription memory data = Prescription(dataIndex,dataHex,addr) ;
       pStores[identity]=data;
       //dataIdInStoreP[dataIndex] = msg.sender;
   }

   function addAuthDataToStore(string memory identity, string memory dataHex ) public {
       dataIndex += 1 ;
       Authstorage memory data = Authstorage(dataIndex,dataHex,addr) ;
       auStores[identity]=data;
      // dataIdInStoreM[dataIndex] = msg.sender;
   }



//提取数据
    function getData(uint id) view public returns(string memory){
       Datastorage memory datas = stores[dataIdInStore[id]][id];
       //price1 == datas.price;
       return(datas.dataHex);
   }
    function getAuData(string memory id) view public returns(string memory){
       Authstorage memory datas = auStores[id];
       //price1 == datas.price;
       return(datas.dataHex);
   }
   function getMedicData(string memory id) view public returns(string memory){
       Medicstorage memory datas = mStores2[id];
       //price1 == datas.price;
       return(datas.dataHex);
   }
   function getPrescriptionData(string memory id) view public returns(string memory){
       Medicstorage memory datas = mStores2[id];
       //price1 == datas.price;
       return(datas.dataHex);
   }
   

}