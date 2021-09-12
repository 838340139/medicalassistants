package com.hnu.blockchainlab.medicalassistants.libcommon.util;

import conflux.web3j.Account;
import conflux.web3j.Account.Option;
import conflux.web3j.Cfx;
import conflux.web3j.contract.ContractCall;
import conflux.web3j.contract.abi.DecodeUtil;
import conflux.web3j.types.Address;
import conflux.web3j.types.TransactionBuilder;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;

import static conflux.web3j.contract.abi.DecodeUtil.decode;

public class ContractTool {

    public static String confluxWalletAddress = "cfxtest:aak23uvh7zj5kmzyx7cc1ud6dfta25hruumh7ezr3u";
    //public static String contractaddress = "cfxtest:achbefpgwuxyfv436zshd0pe8zem56y3xjf76n2799";

    public static ContractCall createContractCall() {//创建智能合约方法调用实例
        String contractaddress = "cfxtest:achbefpgwuxyfv436zshd0pe8zem56y3xjf76n2799";
        int retry = 3;
        int intervalMills = 1000;  // interval(milliseconds) between retry
        Cfx cfx = Cfx.create("https://test.confluxrpc.com", retry, intervalMills);
        String privateKey = "E9DBB82E4473B6F43983ECD72C57B3CA55CDCE9A4CEB5DE6C03DF6C3B62CDE70";
        return (new ContractCall(cfx, new Address(contractaddress)));
    }

    public static Account createAccount() {//创建Account
        String contractaddress = "cfxtest:achbefpgwuxyfv436zshd0pe8zem56y3xjf76n2799";
        int retry = 3;
        int intervalMills = 1000;  // interval(milliseconds) between retry
        Cfx cfx = Cfx.create("https://test.confluxrpc.com", retry, intervalMills);
        String privateKey = "E9DBB82E4473B6F43983ECD72C57B3CA55CDCE9A4CEB5DE6C03DF6C3B62CDE70";
        return (Account.create(cfx, privateKey));
    }

    public static String getMedicData(String id, ContractCall contract) { //获取病历数据

        String data1 = (contract.call("getMedicData", new Utf8String(id)).sendAndGet());
        return DecodeUtil.decode(data1, Utf8String.class);
    }

    public static String getPrescriptionData(String id, ContractCall contract) { //获取处方单数据

        String data1 = (contract.call("getPrescriptionData", new Utf8String(id)).sendAndGet());
        return DecodeUtil.decode(data1, Utf8String.class);
    }

    public static String getAuData(String id, ContractCall contract) { //获取认证请求数据
        String data1 = (contract.call("getAuData", new Utf8String(id)).sendAndGet());
        return DecodeUtil.decode(data1, Utf8String.class);
    }

    public static String addMedicDataToStore(Account account, String id, String datas) throws Exception {//上传病历数据
        Option opt = new Option();
        opt.withChainId(1);
        String contractaddress = "cfxtest:achbefpgwuxyfv436zshd0pe8zem56y3xjf76n2799";
        String txHash = account.call(opt, new Address(contractaddress), "addMedicDataToStore", new Utf8String(id), new Utf8String(datas));
        return (txHash);
    }

    public static String addPrescriptionDataToStore(Account account, String id, String datas) throws Exception {//上传处方单数据
        Option opt = new Option();
        opt.withChainId(1);
        String contractaddress = "cfxtest:achbefpgwuxyfv436zshd0pe8zem56y3xjf76n2799";
        String txHash = account.call(opt, new Address(contractaddress), "addMedicDataToStore", new Utf8String(id), new Utf8String(datas));
        return (txHash);
    }

    public static String addAuthDataToStore(Account account, String id, String datas) throws Exception {//上传认证请求数据
        Option opt = new Option();
        opt.withChainId(1);
        String contractaddress = "cfxtest:achbefpgwuxyfv436zshd0pe8zem56y3xjf76n2799";
        String txHash = account.call(opt, new Address(contractaddress), "addAuthDataToStore", new Utf8String(id), new Utf8String(datas));
        return (txHash);
    }

    public static String str2HexStr(String str) { //字符串转16进制
        char[] chars = "0123456789ABCDEF".toCharArray();
        StringBuilder sb = new StringBuilder("");
        byte[] bs = str.getBytes();
        int bit;
        for (int i = 0; i < bs.length; i++) {
            bit = (bs[i] & 0x0f0) >> 4;
            sb.append(chars[bit]);
            bit = bs[i] & 0x0f;
            sb.append(chars[bit]);
            // sb.append(' ');
        }
        return sb.toString().trim();
    }

    public static String hexStr2Str(String hexStr) {//16进制直接转换成为字符串
        String str = "0123456789ABCDEF";
        char[] hexs = hexStr.toCharArray();
        byte[] bytes = new byte[hexStr.length() / 2];
        int n;
        for (int i = 0; i < bytes.length; i++) {
            n = str.indexOf(hexs[2 * i]) * 16;
            n += str.indexOf(hexs[2 * i + 1]);
            bytes[i] = (byte) (n & 0xff);
        }
        return new String(bytes);
    }


}
