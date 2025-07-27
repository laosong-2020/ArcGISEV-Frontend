// src/components/Cards.tsx
import React, { useState, useEffect } from 'react';

import { 
  MdExpandMore as ExpandMoreIcon, 
  MdExpandLess as ExpandLessIcon, 
  MdOutlineOpenInNew as OpenInNewIcon 
} from "react-icons/md";

import { BaseItem, StoreItem } from '../types/dataStoreType';

type PortalMetaInfo = {
  baseUrl: string;
  url: string;
  version: string,
  build: string,
  machineName: string,
  machineIp: string,
  httpPort: number,
  httpsPort: number,
  id: string,
}

type ServerMetaInfo = {
  baseUrl: string;
  url: string;
  version: string,
  build: string,
  machineName: string,
  machineIp: string,
  httpPort: number,
  httpsPort: number,
  id: string,
}

export default function PortalCard() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('Running');
  const [portalMetaInfo, setPortalMetaInfo] = useState<PortalMetaInfo>({
    baseUrl: '',
    url: '',
    version: '',
    build: '',
    machineName: '',
    machineIp: '',
    httpPort: 0,
    httpsPort: 0,
    id: '',
  });
  useEffect(() => {
    const fetchStatus = async () => {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/portal/healthCheck`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': '*/*',
        }
      });
      if (!resp.ok) {
        setStatus('Stopped');
        return;
      }
      const data = await resp.json();
      const status = data.data.status;
      if (status === 'success') {
        setStatus('Running');
      } else {
        setStatus('Stopped');
      }
    };

    // run once
    fetchStatus();
    // run every 5 seconds
    const interval = setInterval(fetchStatus, 5000);

    // clean up interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getPortalMetaInfo = async () => {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/portal/metaInfo`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': '*/*',
          }
        }
      )
      if (!resp.ok) {
        return;
      }
      const respJson = await resp.json();
      const data = respJson.data;
      setPortalMetaInfo(data);
    }
    getPortalMetaInfo();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between text-start p-4 rounded-lg shadow bg-base-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-bold">Portal</span>
        <span className="flex items-center">
          <span className={`h-3 w-3 rounded-full ${status === 'Running' ? 'bg-[#39b54a]' : 'bg-[#ed1a24]'} mr-2`}></span>
          <span className="text-sm text-[#39b54a] font-semibold">{status}</span>
        </span>
      </div>
      {/* Info (Collapsible) */}
      {open && (
        <div className="flex flex-col gap-y-1 text-sm text-gray-400 mt-2">
          <div><span className="font-semibold text-gray-300">Base URL:</span>{portalMetaInfo.baseUrl}</div>
          <div><span className="font-semibold text-gray-300">URL:</span>{portalMetaInfo.url}</div>
          <div><span className="font-semibold text-gray-300">Version:</span>{portalMetaInfo.version}</div>
          <div><span className="font-semibold text-gray-300">Build:</span>{portalMetaInfo.build}</div>
          <div><span className="font-semibold text-gray-300">Machine Name:</span>{portalMetaInfo.machineName}</div>
          <div><span className="font-semibold text-gray-300">Machine IP:</span>{portalMetaInfo.machineIp}</div>
          <div><span className="font-semibold text-gray-300">HTTP Port:</span>{portalMetaInfo.httpPort}</div>
          <div><span className="font-semibold text-gray-300">HTTPS Port:</span>{portalMetaInfo.httpsPort}</div>
          <div><span className="font-semibold text-gray-300">ID:</span>{portalMetaInfo.id}</div>
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-bold">{portalMetaInfo.machineName}</span>
        <div className="flex items-center gap-x-2">
          <button className="btn btn-ghost hover:bg-[#834efe]" onClick={() => setOpen((v) => !v)}>
            {open ? <ExpandLessIcon className="text-xl" /> : <ExpandMoreIcon className="text-xl" />}
          </button>
          <button className="btn btn-ghost hover:bg-[#834efe]">
            <OpenInNewIcon className="text-xl" />
          </button>
        </div>
      </div>
      
    </div>
  );
}

export function ServerCard() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('Running');
  const [serverMetaInfo, setServerMetaInfo] = useState<ServerMetaInfo>({
    baseUrl: '',
    url: '',
    version: '',
    build: '',
    machineName: '',
    machineIp: '',
    httpPort: 0,
    httpsPort: 0,
    id: '',
  });
  useEffect(() => {
    const fetchStatus = async () => {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/portal/healthCheck`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': '*/*',
        }
      });
      if (!resp.ok) {
        setStatus('Stopped');
        return;
      }
      const data = await resp.json();
      const status = data.data.status;
      if (status === 'success') {
        setStatus('Running');
      } else {
        setStatus('Stopped');
      }
    };

    // run once
    fetchStatus();
    // run every 5 seconds
    const interval = setInterval(fetchStatus, 5000);

    // clean up interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getServerMetaInfo = async () => {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/server/metaInfo`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': '*/*',
          }
        }
      )
      if (!resp.ok) {
        return;
      }
      const respJson = await resp.json();
      const data = respJson.data;
      setServerMetaInfo(data);
    }
    getServerMetaInfo();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between text-start p-4 rounded-lg shadow bg-base-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-bold">Server</span>
        <span className="flex items-center">
          <span className={`h-3 w-3 rounded-full ${status === 'Running' ? 'bg-[#39b54a]' : 'bg-[#ed1a24]'} mr-2`}></span>
          <span className="text-sm text-[#39b54a] font-semibold">{status}</span>
        </span>
      </div>
      {/* Info (Collapsible) */}
      {open && (
        <div className="flex flex-col gap-y-1 text-sm text-gray-400 mt-2">
          <div><span className="font-semibold text-gray-300">Base URL:</span>{serverMetaInfo.baseUrl}</div>
          <div><span className="font-semibold text-gray-300">URL:</span>{serverMetaInfo.url}</div>
          <div><span className="font-semibold text-gray-300">Version:</span>{serverMetaInfo.version}</div>
          <div><span className="font-semibold text-gray-300">Build:</span>{serverMetaInfo.build}</div>
          <div><span className="font-semibold text-gray-300">Machine Name:</span>{serverMetaInfo.machineName}</div>
          <div><span className="font-semibold text-gray-300">Machine IP:</span>{serverMetaInfo.machineIp}</div>
          <div><span className="font-semibold text-gray-300">HTTP Port:</span>{serverMetaInfo.httpPort}</div>
          <div><span className="font-semibold text-gray-300">HTTPS Port:</span>{serverMetaInfo.httpsPort}</div>
          <div><span className="font-semibold text-gray-300">ID:</span>{serverMetaInfo.id}</div>
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-bold">{serverMetaInfo.machineName}</span>
        <div className="flex items-center gap-x-2">
          <button className="btn btn-ghost hover:bg-[#834efe]" onClick={() => setOpen((v) => !v)}>
            {open ? <ExpandLessIcon className="text-xl" /> : <ExpandMoreIcon className="text-xl" />}
          </button>
          <button className="btn btn-ghost hover:bg-[#834efe]">
            <OpenInNewIcon className="text-xl" />
          </button>
        </div>
      </div>
      
    </div>
  );
}

export function DataStoreCard() {
  const [open, setOpen] = useState(false);
  const [, setStatus] = useState('Running');
  const [storeItems, setStoreItems] = useState<BaseItem[]>([]);

  useEffect(() => {
    async function fetchStoreItems(): Promise<BaseItem[]> {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/dataStore/metaInfo`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': '*/*',
          }
        }
      )
      if (!resp.ok) {
        return [];
      }
      const respJson = await resp.json();
      const data = respJson.data;
      if (data.length === 0) {
        setStatus('Stopped');
        return [];
      }
      return data.map((item: StoreItem) => ({
        path: item.path,
        type: item.type,
        id: item.id,
      }));
    }
    fetchStoreItems().then(setStoreItems);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 text-start rounded-lg shadow bg-base-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-bold">Data Store</span>
        <span className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-[#39b54a] mr-2"></span>
          <span className="text-sm text-[#39b54a] font-semibold">Running</span>
        </span>
      </div>
      {/* Info (Collapsible) */}
      {open && (
        <ul className="list list-inside list-disc bg-base-100 rounded-lg p-2 text-sm text-gray-400 mt-2">
          {storeItems.map((item) => (
            <li key={item.id} className="mb-1">
              <span className="font-semibold text-gray-300">{item.type}:</span>{item.path}
            </li>
          ))}
        </ul>
      )}
      {/* Actions */}
      <div className="flex justify-end gap-x-2 mb-2">
        <button className="btn btn-ghost hover:bg-[#834efe]" onClick={() => setOpen((v) => !v)}>
          {open ? <ExpandLessIcon className="text-xl" /> : <ExpandMoreIcon className="text-xl" />}
        </button>
        <button className="btn btn-ghost hover:bg-[#834efe]">
          <OpenInNewIcon className="text-xl" />
        </button>
      </div>
      
    </div>
  );
}