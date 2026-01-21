import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\POSController::index
* @see app/Http/Controllers/POSController.php:18
* @route '/pos'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\POSController::index
* @see app/Http/Controllers/POSController.php:18
* @route '/pos'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POSController::index
* @see app/Http/Controllers/POSController.php:18
* @route '/pos'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::index
* @see app/Http/Controllers/POSController.php:18
* @route '/pos'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\POSController::index
* @see app/Http/Controllers/POSController.php:18
* @route '/pos'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::index
* @see app/Http/Controllers/POSController.php:18
* @route '/pos'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::index
* @see app/Http/Controllers/POSController.php:18
* @route '/pos'
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
* @see \App\Http\Controllers\POSController::getProducts
* @see app/Http/Controllers/POSController.php:37
* @route '/pos/products'
*/
export const getProducts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProducts.url(options),
    method: 'get',
})

getProducts.definition = {
    methods: ["get","head"],
    url: '/pos/products',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\POSController::getProducts
* @see app/Http/Controllers/POSController.php:37
* @route '/pos/products'
*/
getProducts.url = (options?: RouteQueryOptions) => {
    return getProducts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POSController::getProducts
* @see app/Http/Controllers/POSController.php:37
* @route '/pos/products'
*/
getProducts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProducts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::getProducts
* @see app/Http/Controllers/POSController.php:37
* @route '/pos/products'
*/
getProducts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getProducts.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\POSController::getProducts
* @see app/Http/Controllers/POSController.php:37
* @route '/pos/products'
*/
const getProductsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getProducts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::getProducts
* @see app/Http/Controllers/POSController.php:37
* @route '/pos/products'
*/
getProductsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getProducts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::getProducts
* @see app/Http/Controllers/POSController.php:37
* @route '/pos/products'
*/
getProductsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getProducts.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getProducts.form = getProductsForm

/**
* @see \App\Http\Controllers\POSController::processSale
* @see app/Http/Controllers/POSController.php:51
* @route '/pos/sale'
*/
export const processSale = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: processSale.url(options),
    method: 'post',
})

processSale.definition = {
    methods: ["post"],
    url: '/pos/sale',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\POSController::processSale
* @see app/Http/Controllers/POSController.php:51
* @route '/pos/sale'
*/
processSale.url = (options?: RouteQueryOptions) => {
    return processSale.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POSController::processSale
* @see app/Http/Controllers/POSController.php:51
* @route '/pos/sale'
*/
processSale.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: processSale.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::processSale
* @see app/Http/Controllers/POSController.php:51
* @route '/pos/sale'
*/
const processSaleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: processSale.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::processSale
* @see app/Http/Controllers/POSController.php:51
* @route '/pos/sale'
*/
processSaleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: processSale.url(options),
    method: 'post',
})

processSale.form = processSaleForm

/**
* @see \App\Http\Controllers\POSController::savePendingSale
* @see app/Http/Controllers/POSController.php:95
* @route '/pos/save-pending'
*/
export const savePendingSale = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: savePendingSale.url(options),
    method: 'post',
})

savePendingSale.definition = {
    methods: ["post"],
    url: '/pos/save-pending',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\POSController::savePendingSale
* @see app/Http/Controllers/POSController.php:95
* @route '/pos/save-pending'
*/
savePendingSale.url = (options?: RouteQueryOptions) => {
    return savePendingSale.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POSController::savePendingSale
* @see app/Http/Controllers/POSController.php:95
* @route '/pos/save-pending'
*/
savePendingSale.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: savePendingSale.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::savePendingSale
* @see app/Http/Controllers/POSController.php:95
* @route '/pos/save-pending'
*/
const savePendingSaleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: savePendingSale.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::savePendingSale
* @see app/Http/Controllers/POSController.php:95
* @route '/pos/save-pending'
*/
savePendingSaleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: savePendingSale.url(options),
    method: 'post',
})

savePendingSale.form = savePendingSaleForm

/**
* @see \App\Http\Controllers\POSController::completePendingSale
* @see app/Http/Controllers/POSController.php:168
* @route '/pending-sales/{pendingSale}/complete'
*/
export const completePendingSale = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completePendingSale.url(args, options),
    method: 'post',
})

completePendingSale.definition = {
    methods: ["post"],
    url: '/pending-sales/{pendingSale}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\POSController::completePendingSale
* @see app/Http/Controllers/POSController.php:168
* @route '/pending-sales/{pendingSale}/complete'
*/
completePendingSale.url = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pendingSale: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pendingSale: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pendingSale: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pendingSale: typeof args.pendingSale === 'object'
        ? args.pendingSale.id
        : args.pendingSale,
    }

    return completePendingSale.definition.url
            .replace('{pendingSale}', parsedArgs.pendingSale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\POSController::completePendingSale
* @see app/Http/Controllers/POSController.php:168
* @route '/pending-sales/{pendingSale}/complete'
*/
completePendingSale.post = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completePendingSale.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::completePendingSale
* @see app/Http/Controllers/POSController.php:168
* @route '/pending-sales/{pendingSale}/complete'
*/
const completePendingSaleForm = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: completePendingSale.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::completePendingSale
* @see app/Http/Controllers/POSController.php:168
* @route '/pending-sales/{pendingSale}/complete'
*/
completePendingSaleForm.post = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: completePendingSale.url(args, options),
    method: 'post',
})

completePendingSale.form = completePendingSaleForm

const POSController = { index, getProducts, processSale, savePendingSale, completePendingSale }

export default POSController