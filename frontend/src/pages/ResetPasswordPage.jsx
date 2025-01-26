import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { putReq } from "@/api/axios";
import { useParams } from "react-router-dom";

export default function ResetPasswordPage() {

  const {token} = useParams()

  console.log(token)

  const handlePasswordReset = async (data) => {

    console.log(data)
// const res  =     await putReq(`/auth/reset/${token}`,data)
// console.log(res)

  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <PasswordResetForm onSubmit={handlePasswordReset} />
        </CardContent>
      </Card>
    </div>
  );
}