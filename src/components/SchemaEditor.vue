<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const schema = {
  required: ["name", "photoUrls"],
  type: "object",
  properties: {
    id: { type: "integer", format: "int64", example: 10 },
    name: { type: "string", example: "doggie" },
    category: { $ref: "#/components/schemas/Category" },
    photoUrls: {
      type: "array",
      xml: { wrapped: true },
      items: { type: "string", xml: { name: "photoUrl" } },
    },
    tags: {
      type: "array",
      xml: { wrapped: true },
      items: { $ref: "#/components/schemas/Tag" },
    },
    status: {
      type: "string",
      description: "pet status in the store",
      enum: ["available", "pending", "sold"],
    },
  },
};

const properties = [
  {
    name: "id",
    type: "integer",
    format: "int64",
    example: 10,
  },
  {
    name: "name",
    type: "string",
    example: "doggie",
  },
  {
    name: "category",
    $ref: "#/components/schemas/Category",
  },

  {
    name: "photoUrls",
    type: "array",
    xml: { wrapped: true },
    items: { type: "string", xml: { name: "photoUrl" } },
  },
  {
    name: "tags",
    type: "array",
    xml: { wrapped: true },
    items: { $ref: "#/components/schemas/Tag" },
  },
  {
    name: "status",
    type: "string",
    description: "pet status in the store",
    enum: ["available", "pending", "sold"],
  },
];
</script>

<template>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead> Name </TableHead>
        <TableHead> Type </TableHead>
        <TableHead> </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="property in properties">
        <TableCell class="text-right">
          {{ property.name }}
        </TableCell>
        <TableCell class="font-medium">
          {{ property.type }}
        </TableCell>
        <TableCell class="text-right">
          <label>
            <Checkbox :checked="schema.required.includes(property.name)" />
            Required
          </label>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
