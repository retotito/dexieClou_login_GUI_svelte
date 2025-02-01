<script lang="ts" >
    import { get } from "svelte/store";
    import { setStateDialog, stateDialogData } from "../stores/storeDialog";
    import { resolveText } from "dexie-cloud-addon";

    const data = get(stateDialogData)
    const ui = data.ui

    function onSubmitForm(e) {
        e.preventDefault()
        e.stopPropagation()
        const formData = new FormData(e.target)
        const formProps = Object.fromEntries(formData);
        ui.onSubmit(formProps)
        setStateDialog("false", {})
    }
    function onCancelForm(e) {
        e.preventDefault()
        e.stopPropagation()
        ui.onCancel()
        setStateDialog("false", {})
    }
</script>

<div class="dialog_overlay" on:click={(e)=>e.stopPropagation()}>
    <div  class="dialog">   
        <div id="dexie_wrapper">
            <h3>{ui.title}</h3>

            <div id="dexie_alerts_wrapper">
                {#each ui.alerts || [] as alert, i (i)}
                    <p key="{i}" alert_type="{alert.type}">{resolveText(alert)}</p>
                {/each}
            </div>

            <div id="dexie_form_wrapper">
                <form on:submit={onSubmitForm} id="dexie_form">
                    {#each Object.entries(ui.fields) as [key, name]}
                        <label>{key}</label><br>
                        <input
                            type="{name.type}"
                            name="{key}"
                            autoFocus
                            placeholder="{name.placeholder}"
                            value=""       
                        ><br>
                    {/each}
                    <button type="submit">{ui.submitLabel}</button>
                    <button type="cancel" on:click={onCancelForm}>{ui.cancelLabel}</button>
                </form>
            </div>
            
        </div>
    </div>
</div>

<style>
/** some styling */
</style>
