import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { filterOptions } from "@/config";
import React from "react";

const ProductFilter = ({ filter, handleFilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((itemKey) => (
          <div key={itemKey}>
            <h3 className="text-base font-bold capitalize">{itemKey}</h3>
            <div className="grid gap-2 mt-2">
              {filterOptions[itemKey].map((option) => (
                <Label
                  key={`${itemKey}-${option.id}`}
                  className="flex items-center gap-2 font-medium"
                >
                  <Checkbox
                    checked={
                      filter &&
                      Object.keys(filter).length > 0 &&
                      filter[itemKey] &&
                      filter[itemKey].indexOf(option.id) > -1
                    }
                    onCheckedChange={() => handleFilter(itemKey, option.id)}
                  />
                  {option.label}
                </Label>
              ))}
            </div>
            <Separator className="my-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
