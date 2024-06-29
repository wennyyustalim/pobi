"use client";

import type { FC, PropsWithChildren } from "react";
import { Thread } from "./thread";
import Image from "next/image";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import cnn from "/public/assets/providers/cnn.svg";
import bbc from "/public/assets/providers/bbc.svg";
import time from "/public/assets/providers/time.svg";
import wsj from "/public/assets/providers/wsj.svg";
import { ModelPicker } from "./ModelPicker";

const models = [
  {
    name: "CNN",
    value: "cnn",
    icon: cnn,
  },
  {
    name: "BBC",
    value: "bbc",
    icon: bbc,
  },
  {
    name: "Time",
    value: "time",
    icon: time,
  },
  {
    name: "Wall Street Journal",
    value: "WSJ",
    icon: wsj,
  },
];

export const AssistantSidebar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="p-8" >
        <ModelPicker />
        <Dropdown className="dropdown">
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="dropdown-trigger"
            >
              Select source
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Action event example"
            onAction={(key) => alert(key)}
            className="dropdown-menu"
          >
            {models.map((model) => (
              <DropdownItem key={model.value} value={model.value} className="dropdown-item">
                <span className="flex items-center gap-2">
                  <Image
                    src={model.icon}
                    alt={model.name}
                    className="inline size-4"
                  />
                  <span>{model.name}</span>
                </span>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <Thread />
    </div>
  );
};
