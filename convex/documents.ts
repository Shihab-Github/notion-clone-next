import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { Doc, Id } from './_generated/dataModel'


export const archive = mutation({
    args: {
        id: v.id('documents')
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Not Authenticated")
        }

        const userId = identity.subject;
        const existingDocument = await ctx.db.get(args.id)

        if(!existingDocument) {
            throw new Error("Document not found")
        }

        if(existingDocument.userId !== userId) {
            throw new Error("You are not authorized")
        }

        const removeChildDocuments = async (documentId: Id<"documents">) => {
            const childDocuments = await ctx.db.
            query('documents')
            .withIndex("by_user_parent", q => {
                return q.eq("userId", userId)
                        .eq('parentDocument', documentId)
            })
            .collect()

            for (let i = 0; i < childDocuments.length; i++) {
                const item = childDocuments[i];
                await ctx.db.patch(item._id, {
                    isArchived: true
                })

                removeChildDocuments(item._id)
            }
        }

        const document = await ctx.db.patch(args.id, {
            isArchived: true
        })

        removeChildDocuments(args.id)

        return document
        
    },
})

export const remove = mutation({
    args: {
        id: v.id('documents')
    },
    handler: async (ctx,args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Not Authenticated")
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id)

        if(!existingDocument) {
            throw new Error("Document do not exist")
        }

        if(existingDocument.userId !== userId) {
            throw new Error("Unauthorized")
        }

    }
})

export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if(!identity){
            throw new Error("Not Authenticated")
        }

        const userId = identity.subject;

        const document = await ctx.db.insert('documents',{
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchived: false,
            published: false 
        })

        return document;
    }
})

export const getSidebar = query({
    args: {
        parentDocument: v.optional(v.id('documents'))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity) {
            throw new Error("Not Authenticated")
        }

        const userId = identity.subject

        const documents = await ctx.db.query('documents').withIndex("by_user_parent", (q) => 
            q.eq('userId', userId).eq('parentDocument', args.parentDocument)
        )
        .filter((q) => q.eq(q.field('isArchived'), false))
        .order('desc')
        .collect()

        return documents
    }
})

export const getArchivedDocuments = query({
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity) {
            throw new Error("Not Authenticated")
        }

        const userId = identity.subject

        const documents = await ctx.db.query('documents').withIndex('by_user', (q) => {
            return q.eq('userId', userId)
        }).filter(q => q.eq(q.field('isArchived'), true))
        .order('desc')
        .collect()

        return documents
    },
})

export const restoreDocument = mutation({
    args: {
        id: v.id("documents")
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity()
        if(!identity) {
            throw new Error("Not Authenticated")
        }

        const userId = identity.subject

        const existingDocument = await ctx.db.get(args.id)

        const restoreChildDocuments = async (documentId: Id<"documents">) => {
            const childDocs = await ctx.db.query('documents')
                                    .withIndex('by_user_parent', (q) => (
                                        q.eq("userId", userId).eq('parentDocument', documentId)
                                    )).collect();

            for (let i = 0; i < childDocs.length; i++) {
                const item = childDocs[i];
                await ctx.db.patch(item._id, {isArchived: false})

                restoreChildDocuments(item._id)
            }
        }

        if(!existingDocument) {
            throw new Error("Document not found")
        }
        
        if(existingDocument.userId !== userId) {
            throw new Error("Unauthorized")
        }

       
        if(existingDocument.parentDocument) {
            const parent = await ctx.db.get(existingDocument.parentDocument)
            if(parent && parent.isArchived) {
                parent.isArchived = false
            }
        }

        await ctx.db.patch(args.id, {isArchived: false})


        restoreChildDocuments(args.id)
      
        return existingDocument

    }
})