import { Client } from "appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";

export const appwriteClient = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);
