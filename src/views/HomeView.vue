<script setup lang="ts">
import yaml from "js-yaml";
import type { OpenAPIV3 } from "openapi-types";
import Paths from "@/components/Paths.vue";
import Badge from "@/components/ui/badge/Badge.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Button from "@/components/ui/button/Button.vue";
import ExampleSpec from "@/assets/example.json";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const parsed: OpenAPIV3.Document = ExampleSpec as any;
</script>

<template>
  <aside class="flex">
    <nav class="min-w-40 border-r p-3 space-y-1">
      <div v-for="(methods, path) in parsed.paths">
        <b>{{ path }}</b>
        <div class="flex gap-1">
          <Badge
            v-if="methods?.post"
            class="bg-green-600"
          >
            POST
          </Badge>
          <Badge
            v-if="methods?.get"
            class="bg-blue-600"
          >
            GET
          </Badge>
          <Badge
            v-if="methods?.put"
            class="bg-yellow-600"
          >
            PUT
          </Badge>
          <Badge
            v-if="methods?.delete"
            class="bg-red-600"
          >
            DELETE
          </Badge>
        </div>
      </div>
    </nav>
    <main>
      <h2>
        {{ parsed.paths["/pet"]?.get?.summary }}
      </h2>

      <Tabs
        default-value="account"
        class="w-[400px]"
      >
        <TabsList>
          <TabsTrigger value="get"> GET </TabsTrigger>
          <TabsTrigger value="post"> POST </TabsTrigger>
          <TabsTrigger value="put"> PUT </TabsTrigger>
          <TabsTrigger value="delete"> DELETE </TabsTrigger>
        </TabsList>
        <TabsContent value="get">
          <form>
            <FormField name="description">
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    :default-value="parsed.paths['/pet']?.get?.description"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField name="operation-id">
              <FormItem>
                <FormLabel>Operation-id</FormLabel>
                <FormControl>
                  <Input
                    :default-value="parsed.paths['/pet']?.get?.operationId"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </form>

          <h3>Parameters</h3>

          <Tabs
            default-value="account"
            class="w-[400px]"
          >
            <TabsList>
              <TabsTrigger
                v-for="path in parsed.paths['/pet']?.get?.parameters"
                :value="'name' in path ? path.name : ''"
              >
                {{ path.name }}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="petId">
              <code>
                <pre>{{ parsed.paths["/pet"]?.get?.parameters[0] }}</pre>
              </code>
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>

          <h3>Responses</h3>
          <Tabs
            default-value="account"
            class="w-[400px]"
          >
            <TabsList>
              <TabsTrigger
                v-for="(_, code) in parsed.paths['/pet']?.get?.responses"
                :value="code"
              >
                <div class="flex items-center gap-1">
                  <div
                    class="w-3 h-3 rounded-full"
                    :class="{
                      'bg-blue-600': Number(code) >= 100,
                      'bg-green-600': Number(code) >= 200,
                      'bg-yellow-600': Number(code) >= 400,
                      'bg-red-600': Number(code) >= 500,
                    }"
                  />
                  {{ code }}
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="200">
              <code>
                <pre>{{ parsed.paths["/pet"]?.get?.responses["200"] }}</pre>
              </code>
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
          <hr class="my-3" />
          <code>
            <pre>{{ parsed.paths["/pet"]?.get }}</pre>
          </code>
        </TabsContent>
        <TabsContent value="post">
          <pre>{{ parsed.paths["/pet"]?.post }}</pre>
        </TabsContent>
        <TabsContent value="put">
          <pre>{{ parsed.paths["/pet"]?.put }}</pre>
        </TabsContent>
        <TabsContent value="delete">
          <pre>{{ parsed.paths["/pet"]?.delete }}</pre>
        </TabsContent>
      </Tabs>
    </main>
  </aside>
</template>
