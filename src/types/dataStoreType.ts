// src/types/dataStoreType.ts

export type StoreItem =
  | ObjectStoreItem
  | CloudStoreItem
  | NoSqlCacheItem
  | NoSqlTileCacheItem
  | NoSqlQueueItem
  | RasterStoreItem

export interface BaseItem {
  path: string
  type: string
  id: string
}

export interface ObjectStoreItem extends BaseItem {
  type: 'objectStore'
  provider: 'ArcGIS Data Store'
  info: ObjectStoreInfo
}

export interface CloudStoreItem extends BaseItem {
  type: 'cloudStore'
  provider: string
  info: CloudStoreInfo
}

export interface NoSqlCacheItem extends BaseItem {
  type: 'nosql'
  provider: 'ArcGIS Data Store'
  info: NoSqlCacheInfo
}

export interface NoSqlTileCacheItem extends BaseItem {
  path: `/nosqlDatabases/AGSDataStore_nosqldb_${string}`
  type: 'nosql'
  provider: 'ArcGIS Data Store'
  info: NoSqlTileCacheInfo
}

export interface NoSqlQueueItem extends BaseItem {
  type: 'nosql'
  provider: 'ArcGIS Data Store'
  info: NoSqlQueueInfo
}

export interface RasterStoreItem extends BaseItem {
  type: 'rasterStore'
  info: RasterStoreInfo
}

// —— Info 结构 —— //

export interface MachineInfo {
  role?: string
  name: string
  platform: string
  adminURL: string
  // 以下为可选字段，按需要补充
  isSCMEnabled?: boolean
  isOMEnabled?: boolean
  scmID?: string
  omID?: string
  isSCMPrimordialNode?: boolean
  managerNumber?: number
  dbVersion?: string
  endpoint?: string
  isDataNodeEnabled?: boolean
  isS3GEnabled?: boolean
  dbPort?: number
  tcpPort?: number
  httpPort?: number
  httpsPort?: number
  discoverPort?: number
  communicationPort?: number
  clientConnPort?: number
  activated?: boolean
  unqHostname?: string
}

// 1. Object Store Info
export interface ObjectStoreInfo {
  dsFeature: string
  isManaged: boolean
  systemManaged: boolean
  isManagedData: boolean
  deployMode: string
  factory: string
  implementation: string
  category: string
  provider: string
  purposes: string[]
  supportedStorageClasses: string[]
  objectStore: string
  finalized: boolean
  datastoreName: string
  connectionString: string
  accessKey: string
  secretKey: string
  sslEnabled: boolean
  refreshTokenExpiresAt?: number
  machines: MachineInfo[]
}

// 2. Cloud Store Info
export interface CloudStoreInfo {
  isManaged: boolean
  connectionString: string
  objectStore: string
}

// 3. NoSQL Cache Store (Apache Ignite)
export interface NoSqlCacheInfo {
  isManaged: boolean
  systemManaged: boolean
  isManagedData: boolean
  factory: string
  implementation: string
  category: string
  provider: string
  purposes: string[]
  dsFeature: string
  instance: string
  datastoreName: string
  dataRegions: {
    name: string
    persistent: boolean
    drInitSize: number
    drMaxSize: number
  }[]
  users: {
    username: string
    password: string
    role: string
  }[]
  machines: MachineInfo[]
  connectionString: string
}

// 4. NoSQL Tile Cache (CouchDB)
export interface NoSqlTileCacheInfo {
  isManaged: boolean
  systemManaged: boolean
  isManagedData: boolean
  category: string
  factory: string
  implementation: string
  provider: string
  purposes: string[]
  dsFeature: string
  dsname: string
  protocol: string
  port: number
  secureProtocol: string
  securePort: number
  adminUserName: string
  adminPassword: string
  managedUserName: string
  managedUserPassword: string
  encryptedFields: string[]
  useSSLForData: boolean
  storeRelease: string
  architecture: string
  hostname: string
  unqHostname: string
  machines: MachineInfo[]
  connectionString: string
}

// 5. NoSQL Queue Store (RabbitMQ)
export interface NoSqlQueueInfo {
  dsFeature: string
  isManaged: boolean
  systemManaged: boolean
  isManagedData: boolean
  factory: string
  implementation: string
  category: string
  provider: string
  purposes: string[]
  deploymentMode: string
  sslEnabled: boolean
  storeSig: string
  datastoreName: string
  users: {
    username: string
    password: string
    role: string
  }[]
  machines: MachineInfo[]
  connectionString: string
}

// 6. Raster Store Info
export interface RasterStoreInfo {
  connectionString: string
  connectionType: 'fileShare' | 'dataStore'
}
