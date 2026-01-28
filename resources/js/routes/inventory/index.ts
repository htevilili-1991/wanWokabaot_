import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
/**
* @see \App\Http\Controllers\InventoryController::index
* @see app/Http/Controllers/InventoryController.php:18
* @route '/inventory'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/inventory',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InventoryController::index
* @see app/Http/Controllers/InventoryController.php:18
* @route '/inventory'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InventoryController::index
* @see app/Http/Controllers/InventoryController.php:18
* @route '/inventory'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::index
* @see app/Http/Controllers/InventoryController.php:18
* @route '/inventory'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InventoryController::index
* @see app/Http/Controllers/InventoryController.php:18
* @route '/inventory'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::index
* @see app/Http/Controllers/InventoryController.php:18
* @route '/inventory'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::index
* @see app/Http/Controllers/InventoryController.php:18
* @route '/inventory'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\InventoryController::lowStock
* @see app/Http/Controllers/InventoryController.php:61
* @route '/inventory/low-stock'
*/
export const lowStock = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lowStock.url(options),
    method: 'get',
})

lowStock.definition = {
    methods: ["get","head"],
    url: '/inventory/low-stock',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InventoryController::lowStock
* @see app/Http/Controllers/InventoryController.php:61
* @route '/inventory/low-stock'
*/
lowStock.url = (options?: RouteQueryOptions) => {
    return lowStock.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InventoryController::lowStock
* @see app/Http/Controllers/InventoryController.php:61
* @route '/inventory/low-stock'
*/
lowStock.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lowStock.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::lowStock
* @see app/Http/Controllers/InventoryController.php:61
* @route '/inventory/low-stock'
*/
lowStock.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lowStock.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InventoryController::lowStock
* @see app/Http/Controllers/InventoryController.php:61
* @route '/inventory/low-stock'
*/
const lowStockForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lowStock.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::lowStock
* @see app/Http/Controllers/InventoryController.php:61
* @route '/inventory/low-stock'
*/
lowStockForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lowStock.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::lowStock
* @see app/Http/Controllers/InventoryController.php:61
* @route '/inventory/low-stock'
*/
lowStockForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lowStock.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

lowStock.form = lowStockForm

/**
* @see \App\Http\Controllers\InventoryController::importMethod
* @see app/Http/Controllers/InventoryController.php:192
* @route '/inventory/import'
*/
export const importMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/inventory/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InventoryController::importMethod
* @see app/Http/Controllers/InventoryController.php:192
* @route '/inventory/import'
*/
importMethod.url = (options?: RouteQueryOptions) => {
    return importMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InventoryController::importMethod
* @see app/Http/Controllers/InventoryController.php:192
* @route '/inventory/import'
*/
importMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InventoryController::importMethod
* @see app/Http/Controllers/InventoryController.php:192
* @route '/inventory/import'
*/
const importMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: importMethod.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InventoryController::importMethod
* @see app/Http/Controllers/InventoryController.php:192
* @route '/inventory/import'
*/
importMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: importMethod.url(options),
    method: 'post',
})

importMethod.form = importMethodForm

/**
* @see \App\Http\Controllers\InventoryController::exportSample
* @see app/Http/Controllers/InventoryController.php:210
* @route '/inventory/export-sample'
*/
export const exportSample = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportSample.url(options),
    method: 'get',
})

exportSample.definition = {
    methods: ["get","head"],
    url: '/inventory/export-sample',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InventoryController::exportSample
* @see app/Http/Controllers/InventoryController.php:210
* @route '/inventory/export-sample'
*/
exportSample.url = (options?: RouteQueryOptions) => {
    return exportSample.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InventoryController::exportSample
* @see app/Http/Controllers/InventoryController.php:210
* @route '/inventory/export-sample'
*/
exportSample.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportSample.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::exportSample
* @see app/Http/Controllers/InventoryController.php:210
* @route '/inventory/export-sample'
*/
exportSample.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportSample.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InventoryController::exportSample
* @see app/Http/Controllers/InventoryController.php:210
* @route '/inventory/export-sample'
*/
const exportSampleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportSample.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::exportSample
* @see app/Http/Controllers/InventoryController.php:210
* @route '/inventory/export-sample'
*/
exportSampleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportSample.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::exportSample
* @see app/Http/Controllers/InventoryController.php:210
* @route '/inventory/export-sample'
*/
exportSampleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportSample.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportSample.form = exportSampleForm

/**
* @see \App\Http\Controllers\InventoryController::create
* @see app/Http/Controllers/InventoryController.php:87
* @route '/inventory/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/inventory/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InventoryController::create
* @see app/Http/Controllers/InventoryController.php:87
* @route '/inventory/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InventoryController::create
* @see app/Http/Controllers/InventoryController.php:87
* @route '/inventory/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::create
* @see app/Http/Controllers/InventoryController.php:87
* @route '/inventory/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InventoryController::create
* @see app/Http/Controllers/InventoryController.php:87
* @route '/inventory/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::create
* @see app/Http/Controllers/InventoryController.php:87
* @route '/inventory/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::create
* @see app/Http/Controllers/InventoryController.php:87
* @route '/inventory/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\InventoryController::store
* @see app/Http/Controllers/InventoryController.php:95
* @route '/inventory'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/inventory',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InventoryController::store
* @see app/Http/Controllers/InventoryController.php:95
* @route '/inventory'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InventoryController::store
* @see app/Http/Controllers/InventoryController.php:95
* @route '/inventory'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InventoryController::store
* @see app/Http/Controllers/InventoryController.php:95
* @route '/inventory'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InventoryController::store
* @see app/Http/Controllers/InventoryController.php:95
* @route '/inventory'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\InventoryController::show
* @see app/Http/Controllers/InventoryController.php:130
* @route '/inventory/{product}'
*/
export const show = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/inventory/{product}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InventoryController::show
* @see app/Http/Controllers/InventoryController.php:130
* @route '/inventory/{product}'
*/
show.url = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { product: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            product: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        product: typeof args.product === 'object'
        ? args.product.id
        : args.product,
    }

    return show.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InventoryController::show
* @see app/Http/Controllers/InventoryController.php:130
* @route '/inventory/{product}'
*/
show.get = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::show
* @see app/Http/Controllers/InventoryController.php:130
* @route '/inventory/{product}'
*/
show.head = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InventoryController::show
* @see app/Http/Controllers/InventoryController.php:130
* @route '/inventory/{product}'
*/
const showForm = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::show
* @see app/Http/Controllers/InventoryController.php:130
* @route '/inventory/{product}'
*/
showForm.get = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::show
* @see app/Http/Controllers/InventoryController.php:130
* @route '/inventory/{product}'
*/
showForm.head = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\InventoryController::edit
* @see app/Http/Controllers/InventoryController.php:140
* @route '/inventory/{product}/edit'
*/
export const edit = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/inventory/{product}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InventoryController::edit
* @see app/Http/Controllers/InventoryController.php:140
* @route '/inventory/{product}/edit'
*/
edit.url = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { product: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            product: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        product: typeof args.product === 'object'
        ? args.product.id
        : args.product,
    }

    return edit.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InventoryController::edit
* @see app/Http/Controllers/InventoryController.php:140
* @route '/inventory/{product}/edit'
*/
edit.get = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::edit
* @see app/Http/Controllers/InventoryController.php:140
* @route '/inventory/{product}/edit'
*/
edit.head = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InventoryController::edit
* @see app/Http/Controllers/InventoryController.php:140
* @route '/inventory/{product}/edit'
*/
const editForm = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::edit
* @see app/Http/Controllers/InventoryController.php:140
* @route '/inventory/{product}/edit'
*/
editForm.get = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InventoryController::edit
* @see app/Http/Controllers/InventoryController.php:140
* @route '/inventory/{product}/edit'
*/
editForm.head = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\InventoryController::update
* @see app/Http/Controllers/InventoryController.php:150
* @route '/inventory/{product}'
*/
export const update = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/inventory/{product}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\InventoryController::update
* @see app/Http/Controllers/InventoryController.php:150
* @route '/inventory/{product}'
*/
update.url = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { product: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            product: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        product: typeof args.product === 'object'
        ? args.product.id
        : args.product,
    }

    return update.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InventoryController::update
* @see app/Http/Controllers/InventoryController.php:150
* @route '/inventory/{product}'
*/
update.put = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\InventoryController::update
* @see app/Http/Controllers/InventoryController.php:150
* @route '/inventory/{product}'
*/
const updateForm = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InventoryController::update
* @see app/Http/Controllers/InventoryController.php:150
* @route '/inventory/{product}'
*/
updateForm.put = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\InventoryController::destroy
* @see app/Http/Controllers/InventoryController.php:170
* @route '/inventory/{product?}'
*/
export const destroy = (args?: { product?: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/inventory/{product?}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\InventoryController::destroy
* @see app/Http/Controllers/InventoryController.php:170
* @route '/inventory/{product?}'
*/
destroy.url = (args?: { product?: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { product: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            product: args[0],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "product",
    ])

    const parsedArgs = {
        product: typeof args?.product === 'object'
        ? args.product.id
        : args?.product,
    }

    return destroy.definition.url
            .replace('{product?}', parsedArgs.product?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InventoryController::destroy
* @see app/Http/Controllers/InventoryController.php:170
* @route '/inventory/{product?}'
*/
destroy.delete = (args?: { product?: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\InventoryController::destroy
* @see app/Http/Controllers/InventoryController.php:170
* @route '/inventory/{product?}'
*/
const destroyForm = (args?: { product?: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InventoryController::destroy
* @see app/Http/Controllers/InventoryController.php:170
* @route '/inventory/{product?}'
*/
destroyForm.delete = (args?: { product?: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const inventory = {
    index: Object.assign(index, index),
    lowStock: Object.assign(lowStock, lowStock),
    import: Object.assign(importMethod, importMethod),
    exportSample: Object.assign(exportSample, exportSample),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default inventory