import { vmmnetwork } from "./vmmnetwork"
import { vmmservers_locations } from "./vmmservers_locations"
import { windowsversion } from "./windowsVersion"

export interface requestServer {
    guid: string
    cpu: number
    memory: number
    network: string
    networkId:string
    vlanID: number
    domain: string
    windowsVersion: windowsversion
    location?: string
    isSQLServer: boolean
    isInfraServer :boolean
    description: string
    requester: string
    networkDTO:vmmnetwork
    ipAddress: string
    serverName:string
    approved: boolean
    vServerCreation:number
    dscCreation:number
    dscInjection:number
    systemDiskRename:number
    serverAutoStart:boolean
    serverStart:number
    completed: boolean
    vmmServer?:vmmservers_locations
    vmmServerId?:number
    blimpId?:number
    blimpEnv?:string
    blimpName?:string
    leonRequestId?:string
    status:number
    manualOverride:boolean
    disk_D?:number
    disk_E?:number
}