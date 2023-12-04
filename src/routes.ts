import { AttributeController } from "./controller/AttributeController"
import { DocumentController } from "./controller/DocumentController"
import { TemplateController } from "./controller/TemplateController"

export const Routes = [
// template
{
    method: "get",
    route: "/template",
    controller: TemplateController,
    action: "all"
}, {
    method: "get",
    route: "/template/:id",
    controller: TemplateController,
    action: "one"
}, {
    method: "post",
    route: "/template",
    controller: TemplateController,
    action: "save"
}, {
    method: "delete",
    route: "/template/:id",
    controller: TemplateController,
    action: "remove"
},

// attribute
{
    method: "get",
    route: "/attribute",
    controller: AttributeController,
    action: "all"
}, {
    method: "get",
    route: "/attribute/:id",
    controller: AttributeController,
    action: "one"
}, {
    method: "post",
    route: "/attribute",
    controller: AttributeController,
    action: "save"
},

// document
{
    method: "get",
    route: "/document",
    controller: DocumentController,
    action: "all"
}, {
    method: "get",
    route: "/document/:id",
    controller: DocumentController,
    action: "one"
}, {
    method: "post",
    route: "/document",
    controller: DocumentController,
    action: "save"
},

]