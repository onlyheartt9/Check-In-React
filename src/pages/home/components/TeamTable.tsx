import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { EditIcon } from "../../../components/Icon/EditIcon";
import { DeleteIcon } from "../../../components/Icon/DeleteIcon";
import { EyeIcon } from "../../../components/Icon/EyeIcon";
import { columns, users } from "./data";
import { useTeamInfo } from "@/server/checkInServer";
import { ethers } from "ethers";
import { copyToClipboard } from "@/utils/copyToClipboard";
import toast from "react-hot-toast";
import { AddIcon } from "@/components/Icon/AddIcon";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const dealData = (data) => {
  return data.map((item, index) => {
    const plays = [item?.player1, item?.player2, item?.player3].filter((item) =>
      ethers.isAddress(item)
    );
    return {
      ...item,
      id: index + 1,
      limit: item?.teamType + 1,
      currentNum: plays.length,
    };
  });
};

export default function TeamTable() {
  const [data0] = useTeamInfo({ args: [1] });
  const [data1] = useTeamInfo({ args: [2] });
  const data = dealData([data0, data1]);
  console.log(data);
  const addTeam = (team)=>{

  }

  const renderCell = useCallback((team, columnKey) => {
    const cellValue = team[columnKey];
    console.log(cellValue, 9999);
    switch (columnKey) {
      case "id":
        return (
          <>
            <div
              onClick={() => {
                toast.success("Successfully toasted!");
                copyToClipboard(cellValue);
              }}
            >{`No.${cellValue}`}</div>
          </>
        );
      case "limit":
        return <div>{cellValue}</div>;
      case "currentNum":
        return <div>{cellValue}</div>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="加入队伍">
              <span className="text-lg !text-default-400 cursor-pointer active:opacity-50">
                <AddIcon
                  onClick={() => {
                    addTeam(team);
                  }}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="text-foreground-500">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
