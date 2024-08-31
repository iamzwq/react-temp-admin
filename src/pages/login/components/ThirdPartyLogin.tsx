import { Tooltip } from "antd";

import AppleBrandSvg from "@/assets/svg/apple-brand.svg?react";
import GithubBrandSvg from "@/assets/svg/github-brand.svg?react";
import GoogleBrandSvg from "@/assets/svg/google-brand.svg?react";
import MicrosoftBrandSvg from "@/assets/svg/microsoft-brand.svg?react";

export default function ThirdPartyLogin() {
  return (
    <ul className="flex justify-center gap-6 text-xl mt-6">
      <li className="cursor-pointer">
        <Tooltip title="Apple" arrow>
          <AppleBrandSvg />
        </Tooltip>
      </li>
      <li className="cursor-pointer">
        <Tooltip title="Microsoft" arrow>
          <MicrosoftBrandSvg />
        </Tooltip>
      </li>
      <li className="cursor-pointer">
        <Tooltip title="Github" arrow>
          <GithubBrandSvg />
        </Tooltip>
      </li>
      <li className="cursor-pointer">
        <Tooltip title="Google" arrow>
          <GoogleBrandSvg />
        </Tooltip>
      </li>
    </ul>
  );
}
