"use client"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FileUpload } from "../file-upload"
import { useRouter } from "next/navigation"
import { createNewServer } from "@/services/server"
import { Check, X } from "lucide-react"
import { useEffect, useState } from "react"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  image: z.string().min(1, {
    message: "Server image is required",
  }),
})

export const InitialModal = () => {
  const router = useRouter()
  const [nameStatus, setNameStatus] = useState(false)
  const [imageStatus, setImageStatus] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  })

  const isLoading = form.formState.isSubmitting
  const nameValue = form.watch("name")
  const imageValue = form.watch("image")

  useEffect(() => {
    setNameStatus(nameValue.length > 0)
    setImageStatus(imageValue.length > 0)
  }, [nameValue, imageValue])

  const submitForm = async (values: z.infer<typeof formSchema>) => {
    try {
      await createNewServer({ name: values.name, image: values.image })
      form.reset()
      router.refresh()
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden [&>button]:hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">Customize your server</DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image, You can always change it later
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center cursor-pointer">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload endpoint="serverImage" value={field.value} onChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4 flex justify-between items-end">
              <div>
                <span className={`text-sm flex items-center mt-2 ${imageStatus ? "text-green-500" : "text-red-500"}`}>
                  {imageStatus ? <Check className="h-4 w-4 mr-1" /> : <X className="h-4 w-4 mr-1" />}
                  Server image is {imageStatus ? "provided" : "not uploaded"}
                </span>
                <span className={`text-sm flex items-center mt-2 ${nameStatus ? "text-green-500" : "text-red-500"}`}>
                  {nameStatus ? <Check className="h-4 w-4 mr-1" /> : <X className="h-4 w-4 mr-1" />}
                  Server name is {nameStatus ? "provided" : "required"}
                </span>
              </div>
              <div className="flex-1" />
              <Button disabled={isLoading || !form.formState.isValid} variant="primary">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

