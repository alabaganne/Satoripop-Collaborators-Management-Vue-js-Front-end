<template>
    <div class="modal fade" :id="id" style="padding-left: 17px;" tabindex="-1" role="dialog" :aria-labelledby="`Edit ${name}`" aria-hidden="true">
        <form autocomplete="off" @keydown="form.errors.clear($event.target.name)">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-primary light-linear-gradient border-bottom-0">
                        <h3 class="modal-title text-light text-shadow text-uppercase font-weight-bold">Edit {{ name }}</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="p-3">
                            <slot name="modal-body"></slot>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="ml-auto">
                            <button type="button" class="btn rounded-sm btn-sm px-3 py-2 mr-1 btn-dark" data-dismiss="modal">Close</button>
                            <button type="button" class="btn rounded-sm btn-sm px-3 py-2 btn-primary" :disabled="form.errors.any()">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        name: String,
        table: Array,
        tableRowIndex: Number,
        form: Object,
    }
}
</script>

<style>

</style>