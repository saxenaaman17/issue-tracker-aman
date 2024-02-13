"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { createQueryString, QueryParams } from "../utils/general-utils";

const IssueSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((value: string) => {
      const params: QueryParams = {};

      if (value) {
        params["search"] = value;
      }

      const paramKeys = ["pageSize"];

      paramKeys.forEach((key) => {
        const value = searchParams.get(key);
        if (value) {
          params[key] = value;
        }
      });

      const queryString = createQueryString(params);
      const queryParam = queryString ? `?${queryString}` : "";
      router.push(`/issues${queryParam}`);
    }, 1000),
    []
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  };

  return (
    <TextField.Root>
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
      <TextField.Input
        placeholder="Search..."
        onChange={handleOnChange}
        defaultValue={searchParams.get("search") || ""}
      />
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default IssueSearch;
