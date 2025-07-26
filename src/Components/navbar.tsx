import React from 'react';
import { HiMiniUserCircle as UserIcon } from "react-icons/hi2";

export default function Navbar() {
  return (
    <div className="navbar shadow-sm top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 flex items-center h-16">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">ArcGIS EV</a>
        </div>
        <div className="flex gap-6">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <UserIcon className="w-12 h-12" />
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}