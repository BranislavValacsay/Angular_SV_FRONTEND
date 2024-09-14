import { vmmservers_locations } from "../_models/vmmservers_locations"

export interface requestServerDto {
    guid?:string
    cpu: number
    memory: number
    network:string
    networkId: string
    vlanID?: number
    domain?: string
    windowsversionid?: number
    location?:string
    vmmServer?:vmmservers_locations
    VMMServerId:number
    isSQLServer: boolean
    isInfraServer? :boolean
    description?: string
    requester?: string
    ipAddress?: string
    serverName?:string
    blimpId?:number
    blimpEnv?:string
    blimpName?:string
    leonRequestId?:string
    status:number
    ManualOverride:boolean
    disk_D?:number
    disk_E?:number
}