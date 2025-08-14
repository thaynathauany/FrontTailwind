"use client";

import { Api } from "@/services/http";
import type { SignUpPayload, SignUpResponse } from "./types"; 

export async function signUp(payload: SignUpPayload) {
  const { data } = await Api.post<SignUpResponse>("/signup", payload);
  return data;
}