"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { changePasswordByLoggedinUser } from "@/app/actions/account";

const ChangePassword = ({ email }) => {
  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
    rePassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, rePassword } = passwordState;

    if (newPassword !== rePassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await changePasswordByLoggedinUser(email, oldPassword, newPassword);

      toast.success("Password changed successfully");
    } catch (error) {
      toast.error("Password update failed");
    }
  };

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Change password :</h5>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Old password :</Label>
            <Input
              type="password"
              name="oldPassword"
              placeholder="Old password"
              onChange={handlePasswordChange}
              value={passwordState.oldPassword}
            />
          </div>
          <div>
            <Label className="mb-2 block">New password :</Label>
            <Input
              type="password"
              name="newPassword"
              placeholder="New password"
              onChange={handlePasswordChange}
              value={passwordState.newPassword}
            />
          </div>
          <div>
            <Label className="mb-2 block">Re-type New password :</Label>
            <Input
              type="password"
              name="rePassword"
              placeholder="Re-type New password"
              onChange={handlePasswordChange}
              value={passwordState.rePassword}
            />
          </div>
        </div>

        <Button className="mt-5 cursor-pointer" type="submit">
          Save password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
