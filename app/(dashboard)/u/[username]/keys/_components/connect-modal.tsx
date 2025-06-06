"use client";
import { toast } from "sonner";

import { useState, useTransition, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import { IngressInputType } from "@/lib/constant";

import { createIngress } from "@/actions/ingress";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const RTMP = IngressInputType.RTMP_INPUT;
const WHIP = IngressInputType.WHIP_INPUT;


export const ConnectModal = () => {
    const closeRef = useRef<HTMLButtonElement>(null);
    const [isPending, startTransition] = useTransition();

    const [ingressType, setIngressType] = useState<string>(String(RTMP));

    const onSubmit = () => {
        startTransition(() => {
            createIngress(Number(ingressType))
                .then(() => {
                    toast.success("Ingress Created");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Something went wrong"));
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary">
                    Generate connection
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-black">
                <DialogHeader>
                    <DialogTitle>Generate connection</DialogTitle>
                </DialogHeader>
                <Select
                    disabled={isPending}
                    value={ingressType}
                    onValueChange={setIngressType}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={String(RTMP)}>RTMP</SelectItem>
                        <SelectItem value={String(WHIP)}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will reset all active streams using the current connection
                    </AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose ref={closeRef} asChild>
                        <Button variant="ghost">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        disabled={isPending}
                        onClick={onSubmit}
                        variant="primary"
                    >
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
