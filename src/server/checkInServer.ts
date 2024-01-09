import { checkInAbi } from "@/abi/checkInAbi";
import { dealConstractData } from "@/utils/indes";
import { useState } from "react";
import {
  useContractEvent,
  useContractRead as useContractRead_wagmi,
  useContractWrite as useContractWrite_wagmi,
  useWalletClient,
} from "wagmi";

export const CHECK_IN_ADDRESS = "0x78ec6Db4F7E4afAcf07f986AA4a5dcF4424f3392";

// const ConversionMethod = {
//     'Number':Number,
//     // "RedPacket":RedPacketType()
// }

// read公共方法
export const useContractRead = ({ ...params }) => {
  const [data, setData] = useState<any>();

  useContractRead_wagmi({
    ...params,
    onSuccess(data) {
      setData(dealConstractData(data));
    },
  });
  return [data];
};

// 获取所有队伍信息
export const useTeamInfo = (params:any={}) => {
  const { data: walletClient } = useWalletClient();
  return useContractRead({
    address: CHECK_IN_ADDRESS,
    abi: checkInAbi,
    functionName: "getTeamInfo",
    account: walletClient?.account,
    scopeKey: "getTeamInfo",
    // watch: true,
    ...params
  });
};
// 获取所有队伍信息
export const usePlayerInfo = (params:any={}) => {
  const { data: walletClient } = useWalletClient();
  return useContractRead({
    address: CHECK_IN_ADDRESS,
    abi: checkInAbi,
    functionName: "getPlayerInfo",
    account: walletClient?.account,
    scopeKey: "getPlayerInfo",
    ...params
  });
};


// 创建队伍
export const useCreateTeam = (params: any = {}) => {
  const data = useContractWrite_wagmi({
    address: CHECK_IN_ADDRESS,
    abi: checkInAbi,
    functionName: "createTeam",
    onSettled:()=>{
      console.log('onSettled')
    },
    ...params,
  });
  return { ...data };
};

// 加入队伍
export const useJoin = (params: any = {}) => {
  const data = useContractWrite_wagmi({
    address: CHECK_IN_ADDRESS,
    abi: checkInAbi,
    functionName: "join",
    ...params,
  });
  return { ...data };
};
