"use client";
import React from 'react'
import AddUserForm from "../../../components/admin/user-management/AddUserForm"
import UserAssignForm from 'components/admin/user-management/UserAssignForm';
export default function Example() {
  return (
    <div className="mt-3 h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <AddUserForm/>
      <UserAssignForm/>
    </div>
  )
}
