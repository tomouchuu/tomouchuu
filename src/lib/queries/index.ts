import { treaty } from "@elysiajs/eden"
import { getBaseUrl } from "$lib/utils";
import type { App } from "../../routes/api/[...slugs]/+server";

export const getApp = () => treaty<App>(getBaseUrl());
