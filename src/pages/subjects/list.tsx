import {ListView} from "@/components/refine-ui/views/list-view.tsx";
import {Breadcrumb} from "@/components/refine-ui/layout/breadcrumb.tsx";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useMemo, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {DEPARTMENT_OPTIONS} from "@/constants";
import {CreateButton} from "@/components/refine-ui/buttons/create.tsx";
import {DataTable} from "@/components/refine-ui/data-table/data-table.tsx";
import {useTable} from "@refinedev/react-table";
import {Subject} from "@/types";
import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge.tsx";

const SubjectsList = () => {

    const [SearchQuery, setSearchQuery] = useState('')
    const [SelectDepartment, setSelectDepartment] = useState('all')

    const departmentFilters = SelectDepartment === "all" ? [] : [
        {field: "department", operator: "eq" as const, value: SelectDepartment}
    ]
    const searchFilters = SearchQuery ? [
        {field: "name", operator: "contains" as const, value: SearchQuery}
    ] : []


    const subjectTable = useTable<Subject>({
        columns: useMemo<ColumnDef<Subject>[]>(() => [
            {
                id: 'code',
                accessorKey: 'code',
                size: 100,
                header: ()=> <p className=" flex items-center gap-1 font-bold ml-2">Code</p> ,
                cell: ({getValue}) => <Badge>{getValue<string>()}</Badge>
            },
            {
                id: 'name',
                accessorKey: 'name',
                size: 200,
                header: () => <p className=" flex items-center gap-1 font-bold">Name</p>,
                cell: ({getValue}) =>
                    <span className="text-foreground">{getValue<string>()}</span>,
                filterFn: 'includesString'
            },
            {
                id: 'department',
                accessorKey: 'department',
                size: 150,
                header: () => <p className="flex items-center gap-1 font-bold">Department</p>,
                cell: ({getValue}) =>
                    <Badge variant='secondary'>{getValue<string>()}</Badge>
            },
            {
                id: 'description',
                accessorKey: 'description',
                size: 300,
                header: () => <p className=" flex items-center gap-1 font-bold">Description</p>,
                cell: ({getValue}) =>
                    <span className="truncate line-clamp-2">{getValue<string>()}</span>,
            }
        ], []),
        refineCoreProps: {
            resource: 'subjects',
            pagination: {pageSize: 10, mode: "server"},
            filters: {
                permanent: [...departmentFilters, ...searchFilters]
            },
            sorters: {
                initial: [
                    {field: 'id', order:'desc'},
                ]
            },
        }
    });

    return (
       <ListView>


           <Breadcrumb />

           <h1 className="text-3xl font-bold text-foreground tracking-tight">
               Subjects
           </h1>

           <div className="flex flex-col lg:flex-row gap-5 justify-between">
               <p>Quick access to essential metrics and management tools.</p>

               <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full sm:w-auto">
                    <div className="relative w-full max-h-9 md:max-w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary"/>
                        <Input
                            type="text"
                            placeholder="Search by name..."
                            className=" pl-10 w-full"
                            value={SearchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <Select
                            value={SelectDepartment}
                            onValueChange={(value) => setSelectDepartment(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by department"/>
                            </SelectTrigger>
                            
                            <SelectContent>
                                <SelectItem value="all">
                                    All Departments
                                </SelectItem>
                                {DEPARTMENT_OPTIONS.map((department)=>(
                                    <SelectItem key={department.value} value={department.value}>
                                        {department.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <CreateButton />
                    </div>
               </div>
           </div>

           <DataTable table={subjectTable} />
           
       </ListView>
    )
}

export default SubjectsList