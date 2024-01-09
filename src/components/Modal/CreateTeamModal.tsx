import React, { useEffect, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useCreateTeam } from "@/server/checkInServer";
import { ethers } from "ethers";
// import { useLinkApprove } from "@/server/linkServer";
import { Provider, useStore } from "reto";
import { CreateTeamModalStore } from "@/store/CreateTeamModal.store";
import VaildInput from "../ValidInput";
import { ClassProps } from "@/types/intex";

type CreateTeamModalProps = {} & ClassProps;

// 授权相关逻辑
const useOk = ({ value, ref }) => {
  return { onOk: () => {} };
};

const nums = [
  {
    label: "1",
    value: 0,
  },
  {
    label: "2",
    value: 1,
  },
  {
    label: "3",
    value: 2,
  },
];

const InnerCreateTeamModal = ({ className }: CreateTeamModalProps) => {
  const {
    value,
    setValue,
  } = useStore(CreateTeamModalStore);
  const ref = useRef<any>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { write } = useCreateTeam();
  const onOk = () => {
    write({ args: [value-0] });
  };
  

  return (
    <>
      <Button
        className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-600 hover:text-white  ${className}`}
        onClick={onOpen}
      >
        新建队伍
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                新建队伍
              </ModalHeader>
              <ModalBody className="flex flex-col">
                <Select
                  required={true}
                  labelPlacement="outside"
                  label="队伍人数"
                  placeholder="请选择"
                  className="max-w-xs"
                  onChange={(e)=>{
                    setValue(e.target.value)
                  }}
                >
                  {nums.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  onPress={() => {
                    // if (!ref?.current.validate()) {
                    //   return;
                    // }
                    onOk();
                  }}
                >
                  下一步
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
const CreateTeamModal = (props: CreateTeamModalProps) => {
  return (
    <Provider of={CreateTeamModalStore}>
      <InnerCreateTeamModal {...props}></InnerCreateTeamModal>
    </Provider>
  );
};

export default CreateTeamModal;
