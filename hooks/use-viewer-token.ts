"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { createViewerToken } from "@/actions/token";

interface DecodedToken {
  sub?: string;
  name?: string;
}

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    if (!hostIdentity) return;

    let isCancelled = false;

    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        if (isCancelled) return;

        setToken(viewerToken);

        const decoded = jwtDecode<DecodedToken>(viewerToken);
        if (decoded.sub) setIdentity(decoded.sub);
        if (decoded.name) setName(decoded.name);
      } catch {
        toast.error("Something went wrong");
      }
    };

    createToken();

    return () => {
      isCancelled = true;
    };
  }, [hostIdentity]);

  return { token, name, identity };
};
