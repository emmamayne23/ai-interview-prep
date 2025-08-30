"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import { createInterview } from "@/lib/interview.actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
  role: z.string().min(1, { message: "Job role is required" }),
  field: z.string().min(1, { message: "Job field is required" }),
  skills: z.string().min(1, { message: "Skills is required" }),
  level: z.string().min(1, { message: "Level is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  number: z.coerce.number().min(1, { message: "Number is required" }),
});

export default function InterviewForm() {
  const [isCreating, setIsCreating] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      field: "",
      skills: "",
      level: "",
      type: "",
      number: 5,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCreating(true)
    
    try {
      const interview = await createInterview(values);
      
      if(interview) {
        redirect(`/interview/${interview.id}`);
      } else {
        console.log("Failed to create questions for the interview");
        setIsCreating(false)
        redirect("/");
      }
    } catch (error) {
      console.error("Error creating interview:", error);
      setIsCreating(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-3xl mx-auto p-8 bg-white text-gray-700 rounded-xl shadow-sm border border-gray-200"
      >
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Job role</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g. Frontend Developer" 
                  {...field} 
                  className="py-5 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="field"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Job field/ Industry</FormLabel>
              <FormControl>
                <Input
                  placeholder='e.g. Software Engineering, Finance'
                  {...field}
                  className="py-5 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Skills/ Techstack</FormLabel>
              <FormControl>
                <Input
                  placeholder='e.g. React, Node, Finance Modeling'
                  {...field}
                  className="py-5 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
        
        <div className="flex justify-between items-center gap-6">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-gray-700 font-medium">Level</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full py-5 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <SelectValue placeholder="Select the level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-gray-700 font-medium">Interview Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full py-5 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <SelectValue placeholder="Select the type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Number of questions for the interview</FormLabel>
              <FormControl>
                <Input 
                  placeholder="5" 
                  type="number" 
                  {...field} 
                  className="py-5 px-4 border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          disabled={isCreating}
          className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isCreating ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Interview...
            </div>
          ) : (
            "Create Interview"
          )}
        </Button>
      </form>
    </Form>
  );
}