"use client";
import { } from "@radix-ui/react-select";
import { useState } from "react";
import Image from "next/image";
import type { FC } from "react";
import cnn from "/public/assets/providers/cnn.svg";
import bbc from "/public/assets/providers/bbc.svg";
import time from "/public/assets/providers/time.svg";
import wsj from "/public/assets/providers/wsj.svg";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";

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
export const ModelPicker: FC = () => {  
    return (
        <Select defaultValue={models[0]?.value ?? ""}>
            <SelectTrigger className="max-w-[300px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent className="">
                {models.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                        <span className="flex items-center gap-2">
                            <Image
                                src={model.icon}
                                alt={model.name}
                                className="inline size-4"
                            />
                            <span>{model.name}</span>
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
