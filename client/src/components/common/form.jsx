import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  function renderInputByComponentType(getItems) {
    let element = null;
    const value = formData[getItems.name || ""];
    switch (getItems.componentType) {
      case "input":
        element = (
          <Input
            name={getItems.name}
            placeholder={getItems.placeholder}
            id={getItems.name}
            type={getItems.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getItems.name]: event.target.value,
              })
            }
          />
        );
        break;
        
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getItems.name]: value,
              })
            }
            value={formData[getItems.name] || ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getItems.label} />
            </SelectTrigger>
            <SelectContent>
              {getItems.options?.length > 0 &&
                getItems.options.map((optionItem) => (
                  <SelectItem key={optionItem.id} value={optionItem.id}>
                    {optionItem.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getItems.name}
            placeholder={getItems.placeholder}
            id={getItems.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getItems.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={getItems.name}
            placeholder={getItems.placeholder}
            id={getItems.name}
            type={getItems.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getItems.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((item) => (
          <div className="grid w-full gap-1.5" key={item?.name}>
            <Label className="mb-1">{item.label}</Label>
            {renderInputByComponentType(item)}
          </div>
        ))}
      </div>

      <Button type="submit" className="mt-5 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
