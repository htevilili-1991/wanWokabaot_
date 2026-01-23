import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\LocationController::index
* @see app/Http/Controllers/Settings/LocationController.php:17
* @route '/settings/locations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings/locations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\LocationController::index
* @see app/Http/Controllers/Settings/LocationController.php:17
* @route '/settings/locations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\LocationController::index
* @see app/Http/Controllers/Settings/LocationController.php:17
* @route '/settings/locations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::index
* @see app/Http/Controllers/Settings/LocationController.php:17
* @route '/settings/locations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::index
* @see app/Http/Controllers/Settings/LocationController.php:17
* @route '/settings/locations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::index
* @see app/Http/Controllers/Settings/LocationController.php:17
* @route '/settings/locations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::index
* @see app/Http/Controllers/Settings/LocationController.php:17
* @route '/settings/locations'
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
* @see \App\Http\Controllers\Settings\LocationController::create
* @see app/Http/Controllers/Settings/LocationController.php:35
* @route '/settings/locations/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/settings/locations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\LocationController::create
* @see app/Http/Controllers/Settings/LocationController.php:35
* @route '/settings/locations/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\LocationController::create
* @see app/Http/Controllers/Settings/LocationController.php:35
* @route '/settings/locations/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::create
* @see app/Http/Controllers/Settings/LocationController.php:35
* @route '/settings/locations/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::create
* @see app/Http/Controllers/Settings/LocationController.php:35
* @route '/settings/locations/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::create
* @see app/Http/Controllers/Settings/LocationController.php:35
* @route '/settings/locations/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::create
* @see app/Http/Controllers/Settings/LocationController.php:35
* @route '/settings/locations/create'
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
* @see \App\Http\Controllers\Settings\LocationController::store
* @see app/Http/Controllers/Settings/LocationController.php:43
* @route '/settings/locations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/settings/locations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\LocationController::store
* @see app/Http/Controllers/Settings/LocationController.php:43
* @route '/settings/locations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\LocationController::store
* @see app/Http/Controllers/Settings/LocationController.php:43
* @route '/settings/locations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::store
* @see app/Http/Controllers/Settings/LocationController.php:43
* @route '/settings/locations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::store
* @see app/Http/Controllers/Settings/LocationController.php:43
* @route '/settings/locations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Settings\LocationController::show
* @see app/Http/Controllers/Settings/LocationController.php:64
* @route '/settings/locations/{location}'
*/
export const show = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/settings/locations/{location}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\LocationController::show
* @see app/Http/Controllers/Settings/LocationController.php:64
* @route '/settings/locations/{location}'
*/
show.url = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { location: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { location: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            location: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        location: typeof args.location === 'object'
        ? args.location.id
        : args.location,
    }

    return show.definition.url
            .replace('{location}', parsedArgs.location.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\LocationController::show
* @see app/Http/Controllers/Settings/LocationController.php:64
* @route '/settings/locations/{location}'
*/
show.get = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::show
* @see app/Http/Controllers/Settings/LocationController.php:64
* @route '/settings/locations/{location}'
*/
show.head = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::show
* @see app/Http/Controllers/Settings/LocationController.php:64
* @route '/settings/locations/{location}'
*/
const showForm = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::show
* @see app/Http/Controllers/Settings/LocationController.php:64
* @route '/settings/locations/{location}'
*/
showForm.get = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::show
* @see app/Http/Controllers/Settings/LocationController.php:64
* @route '/settings/locations/{location}'
*/
showForm.head = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Settings\LocationController::edit
* @see app/Http/Controllers/Settings/LocationController.php:85
* @route '/settings/locations/{location}/edit'
*/
export const edit = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/settings/locations/{location}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\LocationController::edit
* @see app/Http/Controllers/Settings/LocationController.php:85
* @route '/settings/locations/{location}/edit'
*/
edit.url = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { location: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { location: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            location: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        location: typeof args.location === 'object'
        ? args.location.id
        : args.location,
    }

    return edit.definition.url
            .replace('{location}', parsedArgs.location.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\LocationController::edit
* @see app/Http/Controllers/Settings/LocationController.php:85
* @route '/settings/locations/{location}/edit'
*/
edit.get = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::edit
* @see app/Http/Controllers/Settings/LocationController.php:85
* @route '/settings/locations/{location}/edit'
*/
edit.head = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::edit
* @see app/Http/Controllers/Settings/LocationController.php:85
* @route '/settings/locations/{location}/edit'
*/
const editForm = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::edit
* @see app/Http/Controllers/Settings/LocationController.php:85
* @route '/settings/locations/{location}/edit'
*/
editForm.get = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::edit
* @see app/Http/Controllers/Settings/LocationController.php:85
* @route '/settings/locations/{location}/edit'
*/
editForm.head = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Settings\LocationController::update
* @see app/Http/Controllers/Settings/LocationController.php:95
* @route '/settings/locations/{location}'
*/
export const update = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/settings/locations/{location}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Settings\LocationController::update
* @see app/Http/Controllers/Settings/LocationController.php:95
* @route '/settings/locations/{location}'
*/
update.url = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { location: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { location: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            location: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        location: typeof args.location === 'object'
        ? args.location.id
        : args.location,
    }

    return update.definition.url
            .replace('{location}', parsedArgs.location.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\LocationController::update
* @see app/Http/Controllers/Settings/LocationController.php:95
* @route '/settings/locations/{location}'
*/
update.put = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::update
* @see app/Http/Controllers/Settings/LocationController.php:95
* @route '/settings/locations/{location}'
*/
update.patch = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::update
* @see app/Http/Controllers/Settings/LocationController.php:95
* @route '/settings/locations/{location}'
*/
const updateForm = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::update
* @see app/Http/Controllers/Settings/LocationController.php:95
* @route '/settings/locations/{location}'
*/
updateForm.put = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::update
* @see app/Http/Controllers/Settings/LocationController.php:95
* @route '/settings/locations/{location}'
*/
updateForm.patch = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Settings\LocationController::destroy
* @see app/Http/Controllers/Settings/LocationController.php:116
* @route '/settings/locations/{location}'
*/
export const destroy = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/locations/{location}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\LocationController::destroy
* @see app/Http/Controllers/Settings/LocationController.php:116
* @route '/settings/locations/{location}'
*/
destroy.url = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { location: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { location: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            location: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        location: typeof args.location === 'object'
        ? args.location.id
        : args.location,
    }

    return destroy.definition.url
            .replace('{location}', parsedArgs.location.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\LocationController::destroy
* @see app/Http/Controllers/Settings/LocationController.php:116
* @route '/settings/locations/{location}'
*/
destroy.delete = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::destroy
* @see app/Http/Controllers/Settings/LocationController.php:116
* @route '/settings/locations/{location}'
*/
const destroyForm = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::destroy
* @see app/Http/Controllers/Settings/LocationController.php:116
* @route '/settings/locations/{location}'
*/
destroyForm.delete = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Settings\LocationController::toggle
* @see app/Http/Controllers/Settings/LocationController.php:133
* @route '/settings/locations/{location}/toggle'
*/
export const toggle = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

toggle.definition = {
    methods: ["patch"],
    url: '/settings/locations/{location}/toggle',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\LocationController::toggle
* @see app/Http/Controllers/Settings/LocationController.php:133
* @route '/settings/locations/{location}/toggle'
*/
toggle.url = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { location: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { location: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            location: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        location: typeof args.location === 'object'
        ? args.location.id
        : args.location,
    }

    return toggle.definition.url
            .replace('{location}', parsedArgs.location.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\LocationController::toggle
* @see app/Http/Controllers/Settings/LocationController.php:133
* @route '/settings/locations/{location}/toggle'
*/
toggle.patch = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::toggle
* @see app/Http/Controllers/Settings/LocationController.php:133
* @route '/settings/locations/{location}/toggle'
*/
const toggleForm = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggle.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\LocationController::toggle
* @see app/Http/Controllers/Settings/LocationController.php:133
* @route '/settings/locations/{location}/toggle'
*/
toggleForm.patch = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggle.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

toggle.form = toggleForm

const locations = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    toggle: Object.assign(toggle, toggle),
}

export default locations