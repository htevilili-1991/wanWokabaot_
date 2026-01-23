import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DividendController::memberDividends
* @see app/Http/Controllers/DividendController.php:178
* @route '/my-dividends'
*/
export const memberDividends = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: memberDividends.url(options),
    method: 'get',
})

memberDividends.definition = {
    methods: ["get","head"],
    url: '/my-dividends',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DividendController::memberDividends
* @see app/Http/Controllers/DividendController.php:178
* @route '/my-dividends'
*/
memberDividends.url = (options?: RouteQueryOptions) => {
    return memberDividends.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DividendController::memberDividends
* @see app/Http/Controllers/DividendController.php:178
* @route '/my-dividends'
*/
memberDividends.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: memberDividends.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::memberDividends
* @see app/Http/Controllers/DividendController.php:178
* @route '/my-dividends'
*/
memberDividends.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: memberDividends.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DividendController::memberDividends
* @see app/Http/Controllers/DividendController.php:178
* @route '/my-dividends'
*/
const memberDividendsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: memberDividends.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::memberDividends
* @see app/Http/Controllers/DividendController.php:178
* @route '/my-dividends'
*/
memberDividendsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: memberDividends.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::memberDividends
* @see app/Http/Controllers/DividendController.php:178
* @route '/my-dividends'
*/
memberDividendsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: memberDividends.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

memberDividends.form = memberDividendsForm

/**
* @see \App\Http\Controllers\DividendController::index
* @see app/Http/Controllers/DividendController.php:16
* @route '/dividends'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dividends',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DividendController::index
* @see app/Http/Controllers/DividendController.php:16
* @route '/dividends'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DividendController::index
* @see app/Http/Controllers/DividendController.php:16
* @route '/dividends'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::index
* @see app/Http/Controllers/DividendController.php:16
* @route '/dividends'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DividendController::index
* @see app/Http/Controllers/DividendController.php:16
* @route '/dividends'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::index
* @see app/Http/Controllers/DividendController.php:16
* @route '/dividends'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::index
* @see app/Http/Controllers/DividendController.php:16
* @route '/dividends'
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
* @see \App\Http\Controllers\DividendController::create
* @see app/Http/Controllers/DividendController.php:30
* @route '/dividends/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dividends/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DividendController::create
* @see app/Http/Controllers/DividendController.php:30
* @route '/dividends/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DividendController::create
* @see app/Http/Controllers/DividendController.php:30
* @route '/dividends/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::create
* @see app/Http/Controllers/DividendController.php:30
* @route '/dividends/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DividendController::create
* @see app/Http/Controllers/DividendController.php:30
* @route '/dividends/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::create
* @see app/Http/Controllers/DividendController.php:30
* @route '/dividends/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::create
* @see app/Http/Controllers/DividendController.php:30
* @route '/dividends/create'
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
* @see \App\Http\Controllers\DividendController::store
* @see app/Http/Controllers/DividendController.php:35
* @route '/dividends'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dividends',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DividendController::store
* @see app/Http/Controllers/DividendController.php:35
* @route '/dividends'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DividendController::store
* @see app/Http/Controllers/DividendController.php:35
* @route '/dividends'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::store
* @see app/Http/Controllers/DividendController.php:35
* @route '/dividends'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::store
* @see app/Http/Controllers/DividendController.php:35
* @route '/dividends'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\DividendController::show
* @see app/Http/Controllers/DividendController.php:54
* @route '/dividends/{dividend}'
*/
export const show = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dividends/{dividend}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DividendController::show
* @see app/Http/Controllers/DividendController.php:54
* @route '/dividends/{dividend}'
*/
show.url = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dividend: args }
    }

    if (Array.isArray(args)) {
        args = {
            dividend: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dividend: args.dividend,
    }

    return show.definition.url
            .replace('{dividend}', parsedArgs.dividend.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DividendController::show
* @see app/Http/Controllers/DividendController.php:54
* @route '/dividends/{dividend}'
*/
show.get = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::show
* @see app/Http/Controllers/DividendController.php:54
* @route '/dividends/{dividend}'
*/
show.head = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DividendController::show
* @see app/Http/Controllers/DividendController.php:54
* @route '/dividends/{dividend}'
*/
const showForm = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::show
* @see app/Http/Controllers/DividendController.php:54
* @route '/dividends/{dividend}'
*/
showForm.get = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::show
* @see app/Http/Controllers/DividendController.php:54
* @route '/dividends/{dividend}'
*/
showForm.head = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\DividendController::edit
* @see app/Http/Controllers/DividendController.php:68
* @route '/dividends/{dividend}/edit'
*/
export const edit = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dividends/{dividend}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DividendController::edit
* @see app/Http/Controllers/DividendController.php:68
* @route '/dividends/{dividend}/edit'
*/
edit.url = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dividend: args }
    }

    if (Array.isArray(args)) {
        args = {
            dividend: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dividend: args.dividend,
    }

    return edit.definition.url
            .replace('{dividend}', parsedArgs.dividend.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DividendController::edit
* @see app/Http/Controllers/DividendController.php:68
* @route '/dividends/{dividend}/edit'
*/
edit.get = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::edit
* @see app/Http/Controllers/DividendController.php:68
* @route '/dividends/{dividend}/edit'
*/
edit.head = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DividendController::edit
* @see app/Http/Controllers/DividendController.php:68
* @route '/dividends/{dividend}/edit'
*/
const editForm = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::edit
* @see app/Http/Controllers/DividendController.php:68
* @route '/dividends/{dividend}/edit'
*/
editForm.get = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DividendController::edit
* @see app/Http/Controllers/DividendController.php:68
* @route '/dividends/{dividend}/edit'
*/
editForm.head = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\DividendController::update
* @see app/Http/Controllers/DividendController.php:75
* @route '/dividends/{dividend}'
*/
export const update = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dividends/{dividend}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DividendController::update
* @see app/Http/Controllers/DividendController.php:75
* @route '/dividends/{dividend}'
*/
update.url = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dividend: args }
    }

    if (Array.isArray(args)) {
        args = {
            dividend: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dividend: args.dividend,
    }

    return update.definition.url
            .replace('{dividend}', parsedArgs.dividend.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DividendController::update
* @see app/Http/Controllers/DividendController.php:75
* @route '/dividends/{dividend}'
*/
update.put = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DividendController::update
* @see app/Http/Controllers/DividendController.php:75
* @route '/dividends/{dividend}'
*/
update.patch = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DividendController::update
* @see app/Http/Controllers/DividendController.php:75
* @route '/dividends/{dividend}'
*/
const updateForm = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::update
* @see app/Http/Controllers/DividendController.php:75
* @route '/dividends/{dividend}'
*/
updateForm.put = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::update
* @see app/Http/Controllers/DividendController.php:75
* @route '/dividends/{dividend}'
*/
updateForm.patch = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\DividendController::destroy
* @see app/Http/Controllers/DividendController.php:91
* @route '/dividends/{dividend}'
*/
export const destroy = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dividends/{dividend}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DividendController::destroy
* @see app/Http/Controllers/DividendController.php:91
* @route '/dividends/{dividend}'
*/
destroy.url = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dividend: args }
    }

    if (Array.isArray(args)) {
        args = {
            dividend: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dividend: args.dividend,
    }

    return destroy.definition.url
            .replace('{dividend}', parsedArgs.dividend.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DividendController::destroy
* @see app/Http/Controllers/DividendController.php:91
* @route '/dividends/{dividend}'
*/
destroy.delete = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DividendController::destroy
* @see app/Http/Controllers/DividendController.php:91
* @route '/dividends/{dividend}'
*/
const destroyForm = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::destroy
* @see app/Http/Controllers/DividendController.php:91
* @route '/dividends/{dividend}'
*/
destroyForm.delete = (args: { dividend: string | number } | [dividend: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\DividendController::calculate
* @see app/Http/Controllers/DividendController.php:102
* @route '/dividends/{dividendPeriod}/calculate'
*/
export const calculate = (args: { dividendPeriod: number | { id: number } } | [dividendPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calculate.url(args, options),
    method: 'post',
})

calculate.definition = {
    methods: ["post"],
    url: '/dividends/{dividendPeriod}/calculate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DividendController::calculate
* @see app/Http/Controllers/DividendController.php:102
* @route '/dividends/{dividendPeriod}/calculate'
*/
calculate.url = (args: { dividendPeriod: number | { id: number } } | [dividendPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dividendPeriod: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { dividendPeriod: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            dividendPeriod: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dividendPeriod: typeof args.dividendPeriod === 'object'
        ? args.dividendPeriod.id
        : args.dividendPeriod,
    }

    return calculate.definition.url
            .replace('{dividendPeriod}', parsedArgs.dividendPeriod.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DividendController::calculate
* @see app/Http/Controllers/DividendController.php:102
* @route '/dividends/{dividendPeriod}/calculate'
*/
calculate.post = (args: { dividendPeriod: number | { id: number } } | [dividendPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calculate.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::calculate
* @see app/Http/Controllers/DividendController.php:102
* @route '/dividends/{dividendPeriod}/calculate'
*/
const calculateForm = (args: { dividendPeriod: number | { id: number } } | [dividendPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: calculate.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::calculate
* @see app/Http/Controllers/DividendController.php:102
* @route '/dividends/{dividendPeriod}/calculate'
*/
calculateForm.post = (args: { dividendPeriod: number | { id: number } } | [dividendPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: calculate.url(args, options),
    method: 'post',
})

calculate.form = calculateForm

/**
* @see \App\Http\Controllers\DividendController::approve
* @see app/Http/Controllers/DividendController.php:117
* @route '/dividends/{dividendPeriod}/approve'
*/
export const approve = (args: { dividendPeriod: number | { id: number } } | [dividendPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/dividends/{dividendPeriod}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DividendController::approve
* @see app/Http/Controllers/DividendController.php:117
* @route '/dividends/{dividendPeriod}/approve'
*/
approve.url = (args: { dividendPeriod: number | { id: number } } | [dividendPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dividendPeriod: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { dividendPeriod: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            dividendPeriod: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dividendPeriod: typeof args.dividendPeriod === 'object'
        ? args.dividendPeriod.id
        : args.dividendPeriod,
    }

    return approve.definition.url
            .replace('{dividendPeriod}', parsedArgs.dividendPeriod.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DividendController::approve
* @see app/Http/Controllers/DividendController.php:117
* @route '/dividends/{dividendPeriod}/approve'
*/
approve.post = (args: { dividendPeriod: number | { id: number } } | [dividendPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::approve
* @see app/Http/Controllers/DividendController.php:117
* @route '/dividends/{dividendPeriod}/approve'
*/
const approveForm = (args: { dividendPeriod: number | { id: number } } | [dividendPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::approve
* @see app/Http/Controllers/DividendController.php:117
* @route '/dividends/{dividendPeriod}/approve'
*/
approveForm.post = (args: { dividendPeriod: number | { id: number } } | [dividendPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

approve.form = approveForm

/**
* @see \App\Http\Controllers\DividendController::approveCalculation
* @see app/Http/Controllers/DividendController.php:137
* @route '/dividend-calculations/{calculation}/approve'
*/
export const approveCalculation = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveCalculation.url(args, options),
    method: 'post',
})

approveCalculation.definition = {
    methods: ["post"],
    url: '/dividend-calculations/{calculation}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DividendController::approveCalculation
* @see app/Http/Controllers/DividendController.php:137
* @route '/dividend-calculations/{calculation}/approve'
*/
approveCalculation.url = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { calculation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { calculation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            calculation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        calculation: typeof args.calculation === 'object'
        ? args.calculation.id
        : args.calculation,
    }

    return approveCalculation.definition.url
            .replace('{calculation}', parsedArgs.calculation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DividendController::approveCalculation
* @see app/Http/Controllers/DividendController.php:137
* @route '/dividend-calculations/{calculation}/approve'
*/
approveCalculation.post = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveCalculation.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::approveCalculation
* @see app/Http/Controllers/DividendController.php:137
* @route '/dividend-calculations/{calculation}/approve'
*/
const approveCalculationForm = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approveCalculation.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::approveCalculation
* @see app/Http/Controllers/DividendController.php:137
* @route '/dividend-calculations/{calculation}/approve'
*/
approveCalculationForm.post = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approveCalculation.url(args, options),
    method: 'post',
})

approveCalculation.form = approveCalculationForm

/**
* @see \App\Http\Controllers\DividendController::payDividend
* @see app/Http/Controllers/DividendController.php:148
* @route '/dividend-calculations/{calculation}/pay'
*/
export const payDividend = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payDividend.url(args, options),
    method: 'post',
})

payDividend.definition = {
    methods: ["post"],
    url: '/dividend-calculations/{calculation}/pay',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DividendController::payDividend
* @see app/Http/Controllers/DividendController.php:148
* @route '/dividend-calculations/{calculation}/pay'
*/
payDividend.url = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { calculation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { calculation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            calculation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        calculation: typeof args.calculation === 'object'
        ? args.calculation.id
        : args.calculation,
    }

    return payDividend.definition.url
            .replace('{calculation}', parsedArgs.calculation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DividendController::payDividend
* @see app/Http/Controllers/DividendController.php:148
* @route '/dividend-calculations/{calculation}/pay'
*/
payDividend.post = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payDividend.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::payDividend
* @see app/Http/Controllers/DividendController.php:148
* @route '/dividend-calculations/{calculation}/pay'
*/
const payDividendForm = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: payDividend.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::payDividend
* @see app/Http/Controllers/DividendController.php:148
* @route '/dividend-calculations/{calculation}/pay'
*/
payDividendForm.post = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: payDividend.url(args, options),
    method: 'post',
})

payDividend.form = payDividendForm

const DividendController = { memberDividends, index, create, store, show, edit, update, destroy, calculate, approve, approveCalculation, payDividend }

export default DividendController