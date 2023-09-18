'use client'

import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
    Form,
    FormControl, 
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Activity, RotateCcw, SlidersHorizontal, User2, Users2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ProjectFilterProps {
    setSearchTerm: any
    getFilteredList: () => void
}

const formSchema = z.object({
    businessOwner: z.string(),
    techDelivery: z.string(),
    status: z.string()
})

export const ProjectFilter: FC<ProjectFilterProps> = ({ setSearchTerm, getFilteredList }) => {
    const [isMounted, setIsMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [showReset, setShowReset] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            businessOwner: '',
            techDelivery: '',
            status: ''
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setSearchTerm({
            name: '',
            businessOwner: values.businessOwner,
            techDelivery: values.techDelivery,
            status: values.status
        })

        getFilteredList()

        form.reset()
        setShowReset(true)
        setIsOpen(false)
    }

    const handleReset = async () => {
        setSearchTerm({
            name: '',
            businessOwner: '',
            techDelivery: '',
            status: ''
        })
        getFilteredList()
        setShowReset(false)
    }

    if (!isMounted) return null

    return (
        <>
            <Button onClick={() => setIsOpen(true)} variant="ghost" className="ml-4">
                <SlidersHorizontal className='w-4 h-4 mr-2'/> Advanced Filter
            </Button>
            {showReset && (
            <Button onClick={() => handleReset()} variant="ghost" className="ml-4">
                <RotateCcw className='w-4 h-4 mr-2'/> Reset
            </Button>
            )}
            <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
                {/* <DialogTrigger>
                    <Button onClick={() => setIsOpen(true)} variant="ghost" className="ml-4">
                        <SlidersHorizontal className='w-4 h-4 mr-2'/> Advanced Filter
                    </Button>
                </DialogTrigger> */}
                <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                    <DialogHeader className='pt-8 px-6'>
                        <DialogTitle className='text-2xl flex text-center font-bold justify-center items-center'>
                            <SlidersHorizontal className='w-5 h-5 mr-2'/>Advanced Filter
                        </DialogTitle>
                        <DialogDescription className='text-center text-zinc-500'>
                            Filter your projects even further with these options.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                            <div className='space-y-8 px-6 mt-4'>
                                <FormField 
                                    control={form.control}
                                    name='businessOwner'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-sm flex justify-start items-center font-semibold text-slate-800 dark:text-secondary/70'>
                                                <User2 className='w-4 h-4 mr-2' />
                                                Business Owner
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    disabled={isLoading}
                                                    placeholder='Please enter a name'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name='techDelivery'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-sm flex justify-start items-center font-semibold text-slate-800 dark:text-secondary/70'>
                                                <Users2 className='w-4 h-4 mr-2' />
                                                Tech Delivery Partner
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    disabled={isLoading}
                                                    placeholder='Please enter a name'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm flex justify-start items-center font-semibold text-slate-800 dark:text-secondary/70'>
                                            <Activity className='w-4 h-4 mr-2' />
                                            Status
                                        </FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a channel type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={'1'}>
                                                Not Started
                                            </SelectItem>
                                            <SelectItem value={'2'}>
                                                In Progress
                                            </SelectItem>
                                            <SelectItem value={'3'}>
                                                Completed
                                            </SelectItem>
                                        </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
                            <DialogFooter className='bg-gray-100 px-6 py-4'>
                                <Button disabled={isLoading} variant={'primary'}>
                                    Filter
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
        

    )
}