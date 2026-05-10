# example folder structure

/ReflectionForm
 - index.ts [re-export the component: export * from './implementation/ReflectionForm';]
 - /implementation
   - RelectionForm.tsx [make sure we only 1 component function in here]
   - RelectionFormProps.ts [export the component's Props type here — only if the component takes props]
   - useRelectionFormHandler.ts -> main handler
   - /handler [if main handler has a lot of code we need to organize it in here]
     - useFunction1Handler.ts
     - useFunction2Handler.ts
   - /NestedReplies [create a separate component and use it in the RelectionForm.ts or what ever is needed]
     - index.ts [re-export the component: export * from './implementation/NestedReplies';]
     - /implementation
        - NestedReplies.tsx
        - NestedRepliesProps.ts [export the component's Props type here — only if the component takes props]
        - useNestedRepliesHandler.ts
        - /handler [if main handler has a lot of code we need to organize it in here]
            - useFunction1Handler.ts
            - useFunction2Handler.ts

and so on..
