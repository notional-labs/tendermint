(window.webpackJsonp=window.webpackJsonp||[]).push([[274],{848:function(e,t,l){"use strict";l.r(t);var n=l(1),a=Object(n.a)({},(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[l("h1",{attrs:{id:"creating-a-built-in-application-in-go"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#creating-a-built-in-application-in-go"}},[e._v("#")]),e._v(" Creating a built-in application in Go")]),e._v(" "),l("h2",{attrs:{id:"guide-assumptions"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#guide-assumptions"}},[e._v("#")]),e._v(" Guide assumptions")]),e._v(" "),l("p",[e._v("This guide is designed for beginners who want to get started with a Tendermint\nCore application from scratch. It does not assume that you have any prior\nexperience with Tendermint Core.")]),e._v(" "),l("p",[e._v("Tendermint Core is Byzantine Fault Tolerant (BFT) middleware that takes a state\ntransition machine - written in any programming language - and securely\nreplicates it on many machines.")]),e._v(" "),l("p",[e._v("Although Tendermint Core is written in the Golang programming language, prior\nknowledge of it is not required for this guide. You can learn it as we go due\nto it's simplicity. However, you may want to go through "),l("a",{attrs:{href:"https://learnxinyminutes.com/docs/go/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Learn X in Y minutes\nWhere X=Go"),l("OutboundLink")],1),e._v(" first to familiarize\nyourself with the syntax.")]),e._v(" "),l("p",[e._v("By following along with this guide, you'll create a Tendermint Core project\ncalled kvstore, a (very) simple distributed BFT key-value store.")]),e._v(" "),l("h2",{attrs:{id:"built-in-app-vs-external-app"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#built-in-app-vs-external-app"}},[e._v("#")]),e._v(" Built-in app vs external app")]),e._v(" "),l("p",[e._v("Running your application inside the same process as Tendermint Core will give\nyou the best possible performance.")]),e._v(" "),l("p",[e._v("For other languages, your application have to communicate with Tendermint Core\nthrough a TCP, Unix domain socket or gRPC.")]),e._v(" "),l("h2",{attrs:{id:"_1-1-installing-go"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-installing-go"}},[e._v("#")]),e._v(" 1.1 Installing Go")]),e._v(" "),l("p",[e._v("Please refer to "),l("a",{attrs:{href:"https://go.dev/doc/install",target:"_blank",rel:"noopener noreferrer"}},[e._v("the official guide for installing\nGo"),l("OutboundLink")],1),e._v(".")]),e._v(" "),l("p",[e._v("Verify that you have the latest version of Go installed:")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"sh",base64:"JCBnbyB2ZXJzaW9uCmdvIHZlcnNpb24gZ28xLjE4LnggZGFyd2luL2FtZDY0Cg=="}}),e._v(" "),l("h2",{attrs:{id:"_1-2-creating-a-new-go-project"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-creating-a-new-go-project"}},[e._v("#")]),e._v(" 1.2 Creating a new Go project")]),e._v(" "),l("p",[e._v("We'll start by creating a new Go project. First, initialize the project folder with "),l("code",[e._v("go mod init")]),e._v(". Running this command should create the "),l("code",[e._v("go.mod")]),e._v(" file.")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"sh",base64:"JCBta2RpciBrdnN0b3JlCiQgY2Qga3ZzdG9yZQokIGdvIG1vZCBpbml0IGdpdGh1Yi5jb20vJmx0O3VzZXJuYW1lJmd0Oy9rdnN0b3JlCmdvOiBjcmVhdGluZyBuZXcgZ28ubW9kOiBtb2R1bGUgZ2l0aHViLmNvbS8mbHQ7dXNlcm5hbWUmZ3Q7L2t2c3RvcmUK"}}),e._v(" "),l("p",[e._v("Inside the project directory, create a "),l("code",[e._v("main.go")]),e._v(" file with the following content:")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"cGFja2FnZSBtYWluCgppbXBvcnQgKAogJnF1b3Q7Zm10JnF1b3Q7CikKCmZ1bmMgbWFpbigpIHsKIGZtdC5QcmludGxuKCZxdW90O0hlbGxvLCBUZW5kZXJtaW50IENvcmUmcXVvdDspCn0K"}}),e._v(" "),l("p",[e._v('When run, this should print "Hello, Tendermint Core" to the standard output.')]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"sh",base64:"JCBnbyBydW4gbWFpbi5nbwpIZWxsbywgVGVuZGVybWludCBDb3JlCg=="}}),e._v(" "),l("h2",{attrs:{id:"_1-3-writing-a-tendermint-core-application"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-writing-a-tendermint-core-application"}},[e._v("#")]),e._v(" 1.3 Writing a Tendermint Core application")]),e._v(" "),l("p",[e._v("Tendermint Core communicates with the application through the Application\nBlockChain Interface (ABCI). All message types are defined in the "),l("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/master/proto/tendermint/abci/types.proto",target:"_blank",rel:"noopener noreferrer"}},[e._v("protobuf\nfile"),l("OutboundLink")],1),e._v(".\nThis allows Tendermint Core to run applications written in any programming\nlanguage.")]),e._v(" "),l("p",[e._v("Create a file called "),l("code",[e._v("app.go")]),e._v(" with the following content:")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"cGFja2FnZSBtYWluCgppbXBvcnQgKAogYWJjaXR5cGVzICZxdW90O2dpdGh1Yi5jb20vdGVuZGVybWludC90ZW5kZXJtaW50L2FiY2kvdHlwZXMmcXVvdDsKKQoKdHlwZSBLVlN0b3JlQXBwbGljYXRpb24gc3RydWN0IHt9Cgp2YXIgXyBhYmNpdHlwZXMuQXBwbGljYXRpb24gPSAoKktWU3RvcmVBcHBsaWNhdGlvbikobmlsKQoKZnVuYyBOZXdLVlN0b3JlQXBwbGljYXRpb24oKSAqS1ZTdG9yZUFwcGxpY2F0aW9uIHsKIHJldHVybiAmYW1wO0tWU3RvcmVBcHBsaWNhdGlvbnt9Cn0KCmZ1bmMgKEtWU3RvcmVBcHBsaWNhdGlvbikgSW5mbyhyZXEgYWJjaXR5cGVzLlJlcXVlc3RJbmZvKSBhYmNpdHlwZXMuUmVzcG9uc2VJbmZvIHsKIHJldHVybiBhYmNpdHlwZXMuUmVzcG9uc2VJbmZve30KfQoKZnVuYyAoS1ZTdG9yZUFwcGxpY2F0aW9uKSBEZWxpdmVyVHgocmVxIGFiY2l0eXBlcy5SZXF1ZXN0RGVsaXZlclR4KSBhYmNpdHlwZXMuUmVzcG9uc2VEZWxpdmVyVHggewogcmV0dXJuIGFiY2l0eXBlcy5SZXNwb25zZURlbGl2ZXJUeHtDb2RlOiAwfQp9CgpmdW5jIChLVlN0b3JlQXBwbGljYXRpb24pIENoZWNrVHgocmVxIGFiY2l0eXBlcy5SZXF1ZXN0Q2hlY2tUeCkgYWJjaXR5cGVzLlJlc3BvbnNlQ2hlY2tUeCB7CiByZXR1cm4gYWJjaXR5cGVzLlJlc3BvbnNlQ2hlY2tUeHtDb2RlOiAwfQp9CgpmdW5jIChLVlN0b3JlQXBwbGljYXRpb24pIENvbW1pdCgpIGFiY2l0eXBlcy5SZXNwb25zZUNvbW1pdCB7CiByZXR1cm4gYWJjaXR5cGVzLlJlc3BvbnNlQ29tbWl0e30KfQoKZnVuYyAoS1ZTdG9yZUFwcGxpY2F0aW9uKSBRdWVyeShyZXEgYWJjaXR5cGVzLlJlcXVlc3RRdWVyeSkgYWJjaXR5cGVzLlJlc3BvbnNlUXVlcnkgewogcmV0dXJuIGFiY2l0eXBlcy5SZXNwb25zZVF1ZXJ5e0NvZGU6IDB9Cn0KCmZ1bmMgKEtWU3RvcmVBcHBsaWNhdGlvbikgSW5pdENoYWluKHJlcSBhYmNpdHlwZXMuUmVxdWVzdEluaXRDaGFpbikgYWJjaXR5cGVzLlJlc3BvbnNlSW5pdENoYWluIHsKIHJldHVybiBhYmNpdHlwZXMuUmVzcG9uc2VJbml0Q2hhaW57fQp9CgpmdW5jIChLVlN0b3JlQXBwbGljYXRpb24pIEJlZ2luQmxvY2socmVxIGFiY2l0eXBlcy5SZXF1ZXN0QmVnaW5CbG9jaykgYWJjaXR5cGVzLlJlc3BvbnNlQmVnaW5CbG9jayB7CiByZXR1cm4gYWJjaXR5cGVzLlJlc3BvbnNlQmVnaW5CbG9ja3t9Cn0KCmZ1bmMgKEtWU3RvcmVBcHBsaWNhdGlvbikgRW5kQmxvY2socmVxIGFiY2l0eXBlcy5SZXF1ZXN0RW5kQmxvY2spIGFiY2l0eXBlcy5SZXNwb25zZUVuZEJsb2NrIHsKIHJldHVybiBhYmNpdHlwZXMuUmVzcG9uc2VFbmRCbG9ja3t9Cn0KCmZ1bmMgKEtWU3RvcmVBcHBsaWNhdGlvbikgTGlzdFNuYXBzaG90cyhhYmNpdHlwZXMuUmVxdWVzdExpc3RTbmFwc2hvdHMpIGFiY2l0eXBlcy5SZXNwb25zZUxpc3RTbmFwc2hvdHMgewogcmV0dXJuIGFiY2l0eXBlcy5SZXNwb25zZUxpc3RTbmFwc2hvdHN7fQp9CgpmdW5jIChLVlN0b3JlQXBwbGljYXRpb24pIE9mZmVyU25hcHNob3QoYWJjaXR5cGVzLlJlcXVlc3RPZmZlclNuYXBzaG90KSBhYmNpdHlwZXMuUmVzcG9uc2VPZmZlclNuYXBzaG90IHsKIHJldHVybiBhYmNpdHlwZXMuUmVzcG9uc2VPZmZlclNuYXBzaG90e30KfQoKZnVuYyAoS1ZTdG9yZUFwcGxpY2F0aW9uKSBMb2FkU25hcHNob3RDaHVuayhhYmNpdHlwZXMuUmVxdWVzdExvYWRTbmFwc2hvdENodW5rKSBhYmNpdHlwZXMuUmVzcG9uc2VMb2FkU25hcHNob3RDaHVuayB7CiByZXR1cm4gYWJjaXR5cGVzLlJlc3BvbnNlTG9hZFNuYXBzaG90Q2h1bmt7fQp9CgpmdW5jIChLVlN0b3JlQXBwbGljYXRpb24pIEFwcGx5U25hcHNob3RDaHVuayhhYmNpdHlwZXMuUmVxdWVzdEFwcGx5U25hcHNob3RDaHVuaykgYWJjaXR5cGVzLlJlc3BvbnNlQXBwbHlTbmFwc2hvdENodW5rIHsKIHJldHVybiBhYmNpdHlwZXMuUmVzcG9uc2VBcHBseVNuYXBzaG90Q2h1bmt7fQp9Cg=="}}),e._v(" "),l("p",[e._v("Now, we will go through each method and explain when it is executed while adding\nrequired business logic.")]),e._v(" "),l("h3",{attrs:{id:"_1-3-1-key-value-store-setup"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-1-key-value-store-setup"}},[e._v("#")]),e._v(" 1.3.1 Key-value store setup")]),e._v(" "),l("p",[e._v("For the underlying key-value store we'll use the latest version of "),l("a",{attrs:{href:"https://github.com/dgraph-io/badger",target:"_blank",rel:"noopener noreferrer"}},[e._v("badger"),l("OutboundLink")],1),e._v(", which is an embeddable, persistent and fast key-value (KV) database.")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"sh",base64:"JCBnbyBnZXQgZ2l0aHViLmNvbS9kZ3JhcGgtaW8vYmFkZ2VyL3YzCmdvOiBhZGRlZCBnaXRodWIuY29tL2RncmFwaC1pby9iYWRnZXIvdjMgdjMuMjEwMy4yCg=="}}),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"aW1wb3J0ICZxdW90O2dpdGh1Yi5jb20vZGdyYXBoLWlvL2JhZGdlci92MyZxdW90OwoKdHlwZSBLVlN0b3JlQXBwbGljYXRpb24gc3RydWN0IHsKIGRiICAgICAgICAgICAqYmFkZ2VyLkRCCiBjdXJyZW50QmF0Y2ggKmJhZGdlci5UeG4KfQoKZnVuYyBOZXdLVlN0b3JlQXBwbGljYXRpb24oZGIgKmJhZGdlci5EQikgKktWU3RvcmVBcHBsaWNhdGlvbiB7CiByZXR1cm4gJmFtcDtLVlN0b3JlQXBwbGljYXRpb257CiAgZGI6IGRiLAogfQp9Cg=="}}),e._v(" "),l("h3",{attrs:{id:"_1-3-2-checktx"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-2-checktx"}},[e._v("#")]),e._v(" 1.3.2 CheckTx")]),e._v(" "),l("p",[e._v("When a new transaction is added to the Tendermint Core, it will ask the application to check it (validate the format, signatures, etc.).")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"aW1wb3J0ICgKICAmcXVvdDtieXRlcyZxdW90OwoKICAuLi4KKQoKZnVuYyAoYXBwICpLVlN0b3JlQXBwbGljYXRpb24pIGlzVmFsaWQodHggW11ieXRlKSAoY29kZSB1aW50MzIpIHsKIC8vIGNoZWNrIGZvcm1hdAogcGFydHMgOj0gYnl0ZXMuU3BsaXQodHgsIFtdYnl0ZSgmcXVvdDs9JnF1b3Q7KSkKIGlmIGxlbihwYXJ0cykgIT0gMiB7CiAgcmV0dXJuIDEKIH0KCiBrZXksIHZhbHVlIDo9IHBhcnRzWzBdLCBwYXJ0c1sxXQoKIC8vIGNoZWNrIGlmIHRoZSBzYW1lIGtleT12YWx1ZSBhbHJlYWR5IGV4aXN0cwogZXJyIDo9IGFwcC5kYi5WaWV3KGZ1bmModHhuICpiYWRnZXIuVHhuKSBlcnJvciB7CiAgaXRlbSwgZXJyIDo9IHR4bi5HZXQoa2V5KQogIGlmIGVyciAhPSBuaWwgJmFtcDsmYW1wOyBlcnIgIT0gYmFkZ2VyLkVycktleU5vdEZvdW5kIHsKICAgcmV0dXJuIGVycgogIH0KICBpZiBlcnIgPT0gbmlsIHsKICAgcmV0dXJuIGl0ZW0uVmFsdWUoZnVuYyh2YWwgW11ieXRlKSBlcnJvciB7CiAgICBpZiBieXRlcy5FcXVhbCh2YWwsIHZhbHVlKSB7CiAgICAgY29kZSA9IDIKICAgIH0KICAgIHJldHVybiBuaWwKICAgfSkKICB9CiAgcmV0dXJuIG5pbAogfSkKIGlmIGVyciAhPSBuaWwgewogIHBhbmljKGVycikKIH0KCiByZXR1cm4gY29kZQp9CgpmdW5jIChhcHAgKktWU3RvcmVBcHBsaWNhdGlvbikgQ2hlY2tUeChyZXEgYWJjaXR5cGVzLlJlcXVlc3RDaGVja1R4KSBhYmNpdHlwZXMuUmVzcG9uc2VDaGVja1R4IHsKIGNvZGUgOj0gYXBwLmlzVmFsaWQocmVxLlR4KQogcmV0dXJuIGFiY2l0eXBlcy5SZXNwb25zZUNoZWNrVHh7Q29kZTogY29kZSwgR2FzV2FudGVkOiAxfQp9Cg=="}}),e._v(" "),l("p",[e._v("Don't worry if this does not compile yet.")]),e._v(" "),l("p",[e._v("If the transaction does not have a form of "),l("code",[e._v("{bytes}={bytes}")]),e._v(", we return "),l("code",[e._v("1")]),e._v("\ncode. When the same key=value already exist (same key and value), we return "),l("code",[e._v("2")]),e._v("\ncode. For others, we return a zero code indicating that they are valid.")]),e._v(" "),l("p",[e._v("Note that anything with non-zero code will be considered invalid ("),l("code",[e._v("-1")]),e._v(", "),l("code",[e._v("100")]),e._v(",\netc.) by Tendermint Core.")]),e._v(" "),l("p",[e._v("Valid transactions will eventually be committed given they are not too big and\nhave enough gas. To learn more about gas, check out "),l("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/master/spec/abci/apps.md#gas",target:"_blank",rel:"noopener noreferrer"}},[e._v('"the\nspecification"'),l("OutboundLink")],1),e._v(".")]),e._v(" "),l("h3",{attrs:{id:"_1-3-3-beginblock-delivertx-endblock-commit"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-3-beginblock-delivertx-endblock-commit"}},[e._v("#")]),e._v(" 1.3.3 BeginBlock -> DeliverTx -> EndBlock -> Commit")]),e._v(" "),l("p",[e._v("When Tendermint Core has decided on the block, it's transfered to the\napplication in 3 parts: "),l("code",[e._v("BeginBlock")]),e._v(", one "),l("code",[e._v("DeliverTx")]),e._v(" per transaction and\n"),l("code",[e._v("EndBlock")]),e._v(" in the end. DeliverTx are being transfered asynchronously, but the\nresponses are expected to come in order.")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyAoYXBwICpLVlN0b3JlQXBwbGljYXRpb24pIEJlZ2luQmxvY2socmVxIGFiY2l0eXBlcy5SZXF1ZXN0QmVnaW5CbG9jaykgYWJjaXR5cGVzLlJlc3BvbnNlQmVnaW5CbG9jayB7CiBhcHAuY3VycmVudEJhdGNoID0gYXBwLmRiLk5ld1RyYW5zYWN0aW9uKHRydWUpCiByZXR1cm4gYWJjaXR5cGVzLlJlc3BvbnNlQmVnaW5CbG9ja3t9Cn0KCg=="}}),e._v(" "),l("p",[e._v("Here we create a batch, which will store block's transactions.")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyAoYXBwICpLVlN0b3JlQXBwbGljYXRpb24pIERlbGl2ZXJUeChyZXEgYWJjaXR5cGVzLlJlcXVlc3REZWxpdmVyVHgpIGFiY2l0eXBlcy5SZXNwb25zZURlbGl2ZXJUeCB7CiBjb2RlIDo9IGFwcC5pc1ZhbGlkKHJlcS5UeCkKIGlmIGNvZGUgIT0gMCB7CiAgcmV0dXJuIGFiY2l0eXBlcy5SZXNwb25zZURlbGl2ZXJUeHtDb2RlOiBjb2RlfQogfQoKIHBhcnRzIDo9IGJ5dGVzLlNwbGl0KHJlcS5UeCwgW11ieXRlKCZxdW90Oz0mcXVvdDspKQoga2V5LCB2YWx1ZSA6PSBwYXJ0c1swXSwgcGFydHNbMV0KCiBlcnIgOj0gYXBwLmN1cnJlbnRCYXRjaC5TZXQoa2V5LCB2YWx1ZSkKIGlmIGVyciAhPSBuaWwgewogIHBhbmljKGVycikKIH0KCiByZXR1cm4gYWJjaXR5cGVzLlJlc3BvbnNlRGVsaXZlclR4e0NvZGU6IDB9Cn0K"}}),e._v(" "),l("p",[e._v("If the transaction is badly formatted or the same key=value already exist, we\nagain return the non-zero code. Otherwise, we add it to the current batch.")]),e._v(" "),l("p",[e._v("In the current design, a block can include incorrect transactions (those who\npassed CheckTx, but failed DeliverTx or transactions included by the proposer\ndirectly). This is done for performance reasons.")]),e._v(" "),l("p",[e._v("Note we can't commit transactions inside the "),l("code",[e._v("DeliverTx")]),e._v(" because in such case\n"),l("code",[e._v("Query")]),e._v(", which may be called in parallel, will return inconsistent data (i.e.\nit will report that some value already exist even when the actual block was not\nyet committed).")]),e._v(" "),l("p",[l("code",[e._v("Commit")]),e._v(" instructs the application to persist the new state.")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyAoYXBwICpLVlN0b3JlQXBwbGljYXRpb24pIENvbW1pdCgpIGFiY2l0eXBlcy5SZXNwb25zZUNvbW1pdCB7CiBhcHAuY3VycmVudEJhdGNoLkNvbW1pdCgpCiByZXR1cm4gYWJjaXR5cGVzLlJlc3BvbnNlQ29tbWl0e0RhdGE6IFtdYnl0ZXt9fQp9Cg=="}}),e._v(" "),l("h3",{attrs:{id:"_1-3-4-query"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-4-query"}},[e._v("#")]),e._v(" 1.3.4 Query")]),e._v(" "),l("p",[e._v("Now, when the client wants to know whenever a particular key/value exist, it\nwill call Tendermint Core RPC "),l("code",[e._v("/abci_query")]),e._v(" endpoint, which in turn will call\nthe application's "),l("code",[e._v("Query")]),e._v(" method.")]),e._v(" "),l("p",[e._v("Applications are free to provide their own APIs. But by using Tendermint Core\nas a proxy, clients (including "),l("a",{attrs:{href:"https://godoc.org/github.com/tendermint/tendermint/light",target:"_blank",rel:"noopener noreferrer"}},[e._v("light client\npackage"),l("OutboundLink")],1),e._v(") can leverage\nthe unified API across different applications. Plus they won't have to call the\notherwise separate Tendermint Core API for additional proofs.")]),e._v(" "),l("p",[e._v("Note we don't include a proof here.")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyAoYXBwICpLVlN0b3JlQXBwbGljYXRpb24pIFF1ZXJ5KHJlcVF1ZXJ5IGFiY2l0eXBlcy5SZXF1ZXN0UXVlcnkpIChyZXNRdWVyeSBhYmNpdHlwZXMuUmVzcG9uc2VRdWVyeSkgewogcmVzUXVlcnkuS2V5ID0gcmVxUXVlcnkuRGF0YQogZXJyIDo9IGFwcC5kYi5WaWV3KGZ1bmModHhuICpiYWRnZXIuVHhuKSBlcnJvciB7CiAgaXRlbSwgZXJyIDo9IHR4bi5HZXQocmVxUXVlcnkuRGF0YSkKICBpZiBlcnIgIT0gbmlsICZhbXA7JmFtcDsgZXJyICE9IGJhZGdlci5FcnJLZXlOb3RGb3VuZCB7CiAgIHJldHVybiBlcnIKICB9CiAgaWYgZXJyID09IGJhZGdlci5FcnJLZXlOb3RGb3VuZCB7CiAgIHJlc1F1ZXJ5LkxvZyA9ICZxdW90O2RvZXMgbm90IGV4aXN0JnF1b3Q7CiAgfSBlbHNlIHsKICAgcmV0dXJuIGl0ZW0uVmFsdWUoZnVuYyh2YWwgW11ieXRlKSBlcnJvciB7CiAgICByZXNRdWVyeS5Mb2cgPSAmcXVvdDtleGlzdHMmcXVvdDsKICAgIHJlc1F1ZXJ5LlZhbHVlID0gdmFsCiAgICByZXR1cm4gbmlsCiAgIH0pCiAgfQogIHJldHVybiBuaWwKIH0pCiBpZiBlcnIgIT0gbmlsIHsKICBwYW5pYyhlcnIpCiB9CiByZXR1cm4KfQo="}}),e._v(" "),l("p",[e._v("The complete specification can be found\n"),l("a",{attrs:{href:"https://github.com/tendermint/tendermint/tree/master/spec/abci/",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),l("OutboundLink")],1),e._v(".")]),e._v(" "),l("h2",{attrs:{id:"_1-4-starting-an-application-and-a-tendermint-core-instance-in-the-same-process"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-starting-an-application-and-a-tendermint-core-instance-in-the-same-process"}},[e._v("#")]),e._v(" 1.4 Starting an application and a Tendermint Core instance in the same process")]),e._v(" "),l("p",[e._v('Put the following code into the "main.go" file:')]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"cGFja2FnZSBtYWluCgppbXBvcnQgKAogJnF1b3Q7ZmxhZyZxdW90OwogJnF1b3Q7Zm10JnF1b3Q7CiAmcXVvdDtvcyZxdW90OwogJnF1b3Q7b3Mvc2lnbmFsJnF1b3Q7CiAmcXVvdDtwYXRoL2ZpbGVwYXRoJnF1b3Q7CiAmcXVvdDtzeXNjYWxsJnF1b3Q7CgogJnF1b3Q7Z2l0aHViLmNvbS9kZ3JhcGgtaW8vYmFkZ2VyL3YzJnF1b3Q7CiAmcXVvdDtnaXRodWIuY29tL3NwZjEzL3ZpcGVyJnF1b3Q7CgogIGFiY2ljbGllbnQgJnF1b3Q7Z2l0aHViLmNvbS90ZW5kZXJtaW50L3RlbmRlcm1pbnQvYWJjaS9jbGllbnQmcXVvdDsKICBhYmNpdHlwZXMgJnF1b3Q7Z2l0aHViLmNvbS90ZW5kZXJtaW50L3RlbmRlcm1pbnQvYWJjaS90eXBlcyZxdW90OwogIHRtY29uZmlnICZxdW90O2dpdGh1Yi5jb20vdGVuZGVybWludC90ZW5kZXJtaW50L2NvbmZpZyZxdW90OwogIHRtbG9nICZxdW90O2dpdGh1Yi5jb20vdGVuZGVybWludC90ZW5kZXJtaW50L2xpYnMvbG9nJnF1b3Q7CiAgdG1zZXJ2aWNlICZxdW90O2dpdGh1Yi5jb20vdGVuZGVybWludC90ZW5kZXJtaW50L2xpYnMvc2VydmljZSZxdW90OwogIHRtbm9kZSAmcXVvdDtnaXRodWIuY29tL3RlbmRlcm1pbnQvdGVuZGVybWludC9ub2RlJnF1b3Q7CikKCnZhciBjb25maWdGaWxlIHN0cmluZwoKZnVuYyBpbml0KCkgewogZmxhZy5TdHJpbmdWYXIoJmFtcDtjb25maWdGaWxlLCAmcXVvdDtjb25maWcmcXVvdDssICZxdW90OyRIT01FLy50ZW5kZXJtaW50L2NvbmZpZy9jb25maWcudG9tbCZxdW90OywgJnF1b3Q7UGF0aCB0byBjb25maWcudG9tbCZxdW90OykKfQoKZnVuYyBtYWluKCkgewogZGIsIGVyciA6PSBiYWRnZXIuT3BlbihiYWRnZXIuRGVmYXVsdE9wdGlvbnMoJnF1b3Q7L3RtcC9iYWRnZXImcXVvdDspKQogaWYgZXJyICE9IG5pbCB7CiAgZm10LkZwcmludGYob3MuU3RkZXJyLCAmcXVvdDtmYWlsZWQgdG8gb3BlbiBiYWRnZXIgZGI6ICV2JnF1b3Q7LCBlcnIpCiAgb3MuRXhpdCgxKQogfQogZGVmZXIgZGIuQ2xvc2UoKQogYXBwIDo9IE5ld0tWU3RvcmVBcHBsaWNhdGlvbihkYikKCiBmbGFnLlBhcnNlKCkKCiBub2RlLCBlcnIgOj0gbmV3VGVuZGVybWludChhcHAsIGNvbmZpZ0ZpbGUpCiBpZiBlcnIgIT0gbmlsIHsKICBmbXQuRnByaW50Zihvcy5TdGRlcnIsICZxdW90OyV2JnF1b3Q7LCBlcnIpCiAgb3MuRXhpdCgyKQogfQoKIG5vZGUuU3RhcnQoKQogZGVmZXIgZnVuYygpIHsKICBub2RlLlN0b3AoKQogIG5vZGUuV2FpdCgpCiB9KCkKCiBjIDo9IG1ha2UoY2hhbiBvcy5TaWduYWwsIDEpCiBzaWduYWwuTm90aWZ5KGMsIG9zLkludGVycnVwdCwgc3lzY2FsbC5TSUdURVJNKQogJmx0Oy1jCn0KCmZ1bmMgbmV3VGVuZGVybWludChhcHAgYWJjaXR5cGVzLkFwcGxpY2F0aW9uLCBjb25maWdGaWxlIHN0cmluZykgKHRtc2VydmljZS5TZXJ2aWNlLCBlcnJvcikgewoJLy8gcmVhZCBjb25maWcKCWNvbmZpZyA6PSB0bWNvbmZpZy5EZWZhdWx0VmFsaWRhdG9yQ29uZmlnKCkKCWNvbmZpZy5TZXRSb290KGZpbGVwYXRoLkRpcihmaWxlcGF0aC5EaXIoY29uZmlnRmlsZSkpKQoKCXZpcGVyLlNldENvbmZpZ0ZpbGUoY29uZmlnRmlsZSkKCWlmIGVyciA6PSB2aXBlci5SZWFkSW5Db25maWcoKTsgZXJyICE9IG5pbCB7CgkJcmV0dXJuIG5pbCwgZm10LkVycm9yZigmcXVvdDt2aXBlciBmYWlsZWQgdG8gcmVhZCBjb25maWcgZmlsZTogJXcmcXVvdDssIGVycikKCX0KCWlmIGVyciA6PSB2aXBlci5Vbm1hcnNoYWwoY29uZmlnKTsgZXJyICE9IG5pbCB7CgkJcmV0dXJuIG5pbCwgZm10LkVycm9yZigmcXVvdDt2aXBlciBmYWlsZWQgdG8gdW5tYXJzaGFsIGNvbmZpZzogJXcmcXVvdDssIGVycikKCX0KCWlmIGVyciA6PSBjb25maWcuVmFsaWRhdGVCYXNpYygpOyBlcnIgIT0gbmlsIHsKCQlyZXR1cm4gbmlsLCBmbXQuRXJyb3JmKCZxdW90O2NvbmZpZyBpcyBpbnZhbGlkOiAldyZxdW90OywgZXJyKQoJfQoKCS8vIGNyZWF0ZSBsb2dnZXIKCWxvZ2dlciwgZXJyIDo9IHRtbG9nLk5ld0RlZmF1bHRMb2dnZXIodG1sb2cuTG9nRm9ybWF0UGxhaW4sIGNvbmZpZy5Mb2dMZXZlbCwgZmFsc2UpCglpZiBlcnIgIT0gbmlsIHsKCQlyZXR1cm4gbmlsLCBmbXQuRXJyb3JmKCZxdW90O2ZhaWxlZCB0byBjcmVhdGUgbG9nZ2VyOiAldyZxdW90OywgZXJyKQoJfQoKCS8vIGNyZWF0ZSBub2RlCglub2RlLCBlcnIgOj0gdG1ub2RlLk5ldygKCQljb25maWcsCgkJbG9nZ2VyLAoJCWFiY2ljbGllbnQuTmV3TG9jYWxDcmVhdG9yKGFwcCksCgkJbmlsLAoJKQoJaWYgZXJyICE9IG5pbCB7CgkJcmV0dXJuIG5pbCwgZm10LkVycm9yZigmcXVvdDtmYWlsZWQgdG8gY3JlYXRlIG5ldyBUZW5kZXJtaW50IG5vZGU6ICV3JnF1b3Q7LCBlcnIpCgl9CgoJcmV0dXJuIG5vZGUsIG5pbAp9Cgo="}}),e._v(" "),l("p",[e._v("This is a huge blob of code, so let's break it down into pieces.")]),e._v(" "),l("p",[e._v("First, we initialize the Badger database and create an app instance:")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZGIsIGVyciA6PSBiYWRnZXIuT3BlbihiYWRnZXIuRGVmYXVsdE9wdGlvbnMoJnF1b3Q7L3RtcC9iYWRnZXImcXVvdDspKQppZiBlcnIgIT0gbmlsIHsKIGZtdC5GcHJpbnRmKG9zLlN0ZGVyciwgJnF1b3Q7ZmFpbGVkIHRvIG9wZW4gYmFkZ2VyIGRiOiAldiZxdW90OywgZXJyKQogb3MuRXhpdCgxKQp9CmRlZmVyIGRiLkNsb3NlKCkKYXBwIDo9IE5ld0tWU3RvcmVBcHBsaWNhdGlvbihkYikK"}}),e._v(" "),l("p",[e._v("For "),l("strong",[e._v("Windows")]),e._v(" users, restarting this app will make badger throw an error as it requires value log to be truncated. For more information on this, visit "),l("a",{attrs:{href:"https://github.com/dgraph-io/badger/issues/744",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),l("OutboundLink")],1),e._v(".\nThis can be avoided by setting the truncate option to true, like this:")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZGIsIGVyciA6PSBiYWRnZXIuT3BlbihiYWRnZXIuRGVmYXVsdE9wdGlvbnMoJnF1b3Q7L3RtcC9iYWRnZXImcXVvdDspLldpdGhUcnVuY2F0ZSh0cnVlKSkK"}}),e._v(" "),l("p",[e._v("Then we use it to create a Tendermint Core "),l("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/v0.35.8/libs/service/service.go#L24",target:"_blank",rel:"noopener noreferrer"}},[e._v("Service"),l("OutboundLink")],1),e._v(" instance:")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZmxhZy5QYXJzZSgpCgpub2RlLCBlcnIgOj0gbmV3VGVuZGVybWludChhcHAsIGNvbmZpZ0ZpbGUpCmlmIGVyciAhPSBuaWwgewogZm10LkZwcmludGYob3MuU3RkZXJyLCAmcXVvdDsldiZxdW90OywgZXJyKQogb3MuRXhpdCgyKQp9CgouLi4KCi8vIGNyZWF0ZSBub2RlCm5vZGUsIGVyciA6PSB0bW5vZGUuTmV3KAogIGNvbmZpZywKICBsb2dnZXIsCiAgYWJjaWNsaWVudC5OZXdMb2NhbENyZWF0b3IoYXBwKSwKICBuaWwsCikKaWYgZXJyICE9IG5pbCB7CiAgcmV0dXJuIG5pbCwgZm10LkVycm9yZigmcXVvdDtmYWlsZWQgdG8gY3JlYXRlIG5ldyBUZW5kZXJtaW50IG5vZGU6ICV3JnF1b3Q7LCBlcnIpCn0K"}}),e._v(" "),l("p",[l("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/v0.35.8/node/public.go#L29",target:"_blank",rel:"noopener noreferrer"}},[e._v("tmnode.New"),l("OutboundLink")],1),e._v(" requires a few things including a configuration file, a logger and a few others in order to construct the full node.")]),e._v(" "),l("p",[e._v("Note that we use "),l("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/v0.35.8/abci/client/creators.go#L15",target:"_blank",rel:"noopener noreferrer"}},[e._v("abciclient.NewLocalCreator"),l("OutboundLink")],1),e._v(" here to create a local client instead of one communicating through a socket or gRPC.")]),e._v(" "),l("p",[l("a",{attrs:{href:"https://github.com/spf13/viper",target:"_blank",rel:"noopener noreferrer"}},[e._v("viper"),l("OutboundLink")],1),e._v(" is being used for reading the config,\nwhich we will generate later using the "),l("code",[e._v("tendermint init")]),e._v(" command.")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gcmVhZCBjb25maWcKY29uZmlnIDo9IHRtY29uZmlnLkRlZmF1bHRWYWxpZGF0b3JDb25maWcoKQpjb25maWcuU2V0Um9vdChmaWxlcGF0aC5EaXIoZmlsZXBhdGguRGlyKGNvbmZpZ0ZpbGUpKSkKdmlwZXIuU2V0Q29uZmlnRmlsZShjb25maWdGaWxlKQppZiBlcnIgOj0gdmlwZXIuUmVhZEluQ29uZmlnKCk7IGVyciAhPSBuaWwgewogIHJldHVybiBuaWwsIGZtdC5FcnJvcmYoJnF1b3Q7dmlwZXIgZmFpbGVkIHRvIHJlYWQgY29uZmlnIGZpbGU6ICV3JnF1b3Q7LCBlcnIpCn0KaWYgZXJyIDo9IHZpcGVyLlVubWFyc2hhbChjb25maWcpOyBlcnIgIT0gbmlsIHsKICByZXR1cm4gbmlsLCBmbXQuRXJyb3JmKCZxdW90O3ZpcGVyIGZhaWxlZCB0byB1bm1hcnNoYWwgY29uZmlnOiAldyZxdW90OywgZXJyKQp9CmlmIGVyciA6PSBjb25maWcuVmFsaWRhdGVCYXNpYygpOyBlcnIgIT0gbmlsIHsKICByZXR1cm4gbmlsLCBmbXQuRXJyb3JmKCZxdW90O2NvbmZpZyBpcyBpbnZhbGlkOiAldyZxdW90OywgZXJyKQp9Cg=="}}),e._v(" "),l("p",[e._v("As for the logger, we use the built-in library, which provides a nice\nabstraction over "),l("a",{attrs:{href:"https://github.com/rs/zerolog",target:"_blank",rel:"noopener noreferrer"}},[e._v("zerolog"),l("OutboundLink")],1),e._v(".")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gY3JlYXRlIGxvZ2dlcgpsb2dnZXIsIGVyciA6PSB0bWxvZy5OZXdEZWZhdWx0TG9nZ2VyKHRtbG9nLkxvZ0Zvcm1hdFBsYWluLCBjb25maWcuTG9nTGV2ZWwsIHRydWUpCmlmIGVyciAhPSBuaWwgewogIHJldHVybiBuaWwsIGZtdC5FcnJvcmYoJnF1b3Q7ZmFpbGVkIHRvIGNyZWF0ZSBsb2dnZXI6ICV3JnF1b3Q7LCBlcnIpCn0K"}}),e._v(" "),l("p",[e._v("Finally, we start the node and add some signal handling to gracefully stop it\nupon receiving SIGTERM or Ctrl-C.")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"bm9kZS5TdGFydCgpCmRlZmVyIGZ1bmMoKSB7CiBub2RlLlN0b3AoKQogbm9kZS5XYWl0KCkKfSgpCgpjIDo9IG1ha2UoY2hhbiBvcy5TaWduYWwsIDEpCnNpZ25hbC5Ob3RpZnkoYywgb3MuSW50ZXJydXB0LCBzeXNjYWxsLlNJR1RFUk0pCiZsdDstYwo="}}),e._v(" "),l("h2",{attrs:{id:"_1-5-getting-up-and-running"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-getting-up-and-running"}},[e._v("#")]),e._v(" 1.5 Getting up and running")]),e._v(" "),l("p",[e._v("Make sure to enable "),l("a",{attrs:{href:"https://github.com/golang/go/wiki/Modules",target:"_blank",rel:"noopener noreferrer"}},[e._v("Go modules"),l("OutboundLink")],1),e._v(". Run "),l("code",[e._v("go mod tidy")]),e._v(" to download and add dependencies in "),l("code",[e._v("go.mod")]),e._v(" file.")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"sh",base64:"JCBnbyBtb2QgdGlkeQouLi4K"}}),e._v(" "),l("p",[e._v("Let's make sure we're using the latest version of Tendermint (currently "),l("code",[e._v("v0.35.8")]),e._v(").")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"sh",base64:"JCBnbyBnZXQgZ2l0aHViLmNvbS90ZW5kZXJtaW50L3RlbmRlcm1pbnRAbGF0ZXN0Ci4uLgo="}}),e._v(" "),l("p",[e._v("This will populate the "),l("code",[e._v("go.mod")]),e._v(" with a release number followed by a hash for Tendermint.")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"bW9kdWxlIGdpdGh1Yi5jb20vJmx0O3VzZXJuYW1lJmd0Oy9rdnN0b3JlCgpnbyAxLjE4CgpyZXF1aXJlICgKIGdpdGh1Yi5jb20vZGdyYXBoLWlvL2JhZGdlci92MyB2My4yMTAzLjIKIGdpdGh1Yi5jb20vdGVuZGVybWludC90ZW5kZXJtaW50IHYwLjM1LjgKIC4uLgopCg=="}}),e._v(" "),l("p",[e._v("Now, we can build the binary:")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"sh",base64:"JCBnbyBidWlsZAouLi4K"}}),e._v(" "),l("p",[e._v("To create a default configuration, nodeKey and private validator files, let's\nexecute "),l("code",[e._v("tendermint init validator")]),e._v(". But before we do that, we will need to install\nTendermint Core. Please refer to "),l("a",{attrs:{href:"https://docs.tendermint.com/master/introduction/install.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("the official\nguide"),l("OutboundLink")],1),e._v(". If you're\ninstalling from source, don't forget to checkout the latest release ("),l("code",[e._v("git checkout vX.Y.Z")]),e._v("). Don't forget to check that the application uses the same\nmajor version.")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"sh",base64:"JCBybSAtcmYgL3RtcC9rdnN0b3JlIC90bXAvYmFkZ2VyCiQgVE1IT01FPSZxdW90Oy90bXAva3ZzdG9yZSZxdW90OyB0ZW5kZXJtaW50IGluaXQgdmFsaWRhdG9yCgoyMDIyLTA3LTIwVDE3OjA0OjQxKzA4OjAwIElORk8gR2VuZXJhdGVkIHByaXZhdGUgdmFsaWRhdG9yIGtleUZpbGU9L3RtcC9rdnN0b3JlL2NvbmZpZy9wcml2X3ZhbGlkYXRvcl9rZXkuanNvbiBtb2R1bGU9bWFpbiBzdGF0ZUZpbGU9L3RtcC9rdnN0b3JlL2RhdGEvcHJpdl92YWxpZGF0b3Jfc3RhdGUuanNvbgoyMDIyLTA3LTIwVDE3OjA0OjQxKzA4OjAwIElORk8gR2VuZXJhdGVkIG5vZGUga2V5IG1vZHVsZT1tYWluIHBhdGg9L3RtcC9rdnN0b3JlL2NvbmZpZy9ub2RlX2tleS5qc29uCjIwMjItMDctMjBUMTc6MDQ6NDErMDg6MDAgSU5GTyBHZW5lcmF0ZWQgZ2VuZXNpcyBmaWxlIG1vZHVsZT1tYWluIHBhdGg9L3RtcC9rdnN0b3JlL2NvbmZpZy9nZW5lc2lzLmpzb24KMjAyMi0wNy0yMFQxNzowNDo0MSswODowMCBJTkZPIEdlbmVyYXRlZCBjb25maWcgbW9kZT12YWxpZGF0b3IgbW9kdWxlPW1haW4K"}}),e._v(" "),l("p",[e._v("Feel free to explore the generated files, which can be found at\n"),l("code",[e._v("/tmp/kvstore/config")]),e._v(" directory. Documentation on the config can be found\n"),l("a",{attrs:{href:"https://docs.tendermint.com/master/tendermint-core/configuration.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),l("OutboundLink")],1),e._v(".")]),e._v(" "),l("p",[e._v("We are ready to start our application:")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"sh",base64:"JCAuL2t2c3RvcmUgLWNvbmZpZyAmcXVvdDsvdG1wL2t2c3RvcmUvY29uZmlnL2NvbmZpZy50b21sJnF1b3Q7CgpiYWRnZXIgMjAyMi8wNy8xNiAxMzo1NTo1OSBJTkZPOiBBbGwgMCB0YWJsZXMgb3BlbmVkIGluIDBzCmJhZGdlciAyMDIyLzA3LzE2IDEzOjU1OjU5IElORk86IFJlcGxheWluZyBmaWxlIGlkOiAwIGF0IG9mZnNldDogMApiYWRnZXIgMjAyMi8wNy8xNiAxMzo1NTo1OSBJTkZPOiBSZXBsYXkgdG9vazogMy4wNTLCtXMKYmFkZ2VyIDIwMjIvMDcvMTYgMTM6NTU6NTkgREVCVUc6IFZhbHVlIGxvZyBkaXNjYXJkIHN0YXRzIGVtcHR5CjIwMjItMDctMTZUMTM6NTU6NTkrMDg6MDAgSU5GTyBzdGFydGluZyBzZXJ2aWNlIGltcGw9bXVsdGlBcHBDb25uIG1vZHVsZT1wcm94eSBzZXJ2aWNlPW11bHRpQXBwQ29ubgoyMDIyLTA3LTE2VDEzOjU1OjU5KzA4OjAwIElORk8gc3RhcnRpbmcgc2VydmljZSBjb25uZWN0aW9uPXF1ZXJ5IGltcGw9bG9jYWxDbGllbnQgbW9kdWxlPWFiY2ktY2xpZW50IHNlcnZpY2U9bG9jYWxDbGllbnQKMjAyMi0wNy0xNlQxMzo1NTo1OSswODowMCBJTkZPIHN0YXJ0aW5nIHNlcnZpY2UgY29ubmVjdGlvbj1zbmFwc2hvdCBpbXBsPWxvY2FsQ2xpZW50IG1vZHVsZT1hYmNpLWNsaWVudCBzZXJ2aWNlPWxvY2FsQ2xpZW50CjIwMjItMDctMTZUMTM6NTU6NTkrMDg6MDAgSU5GTyBzdGFydGluZyBzZXJ2aWNlIGNvbm5lY3Rpb249bWVtcG9vbCBpbXBsPWxvY2FsQ2xpZW50IG1vZHVsZT1hYmNpLWNsaWVudCBzZXJ2aWNlPWxvY2FsQ2xpZW50CjIwMjItMDctMTZUMTM6NTU6NTkrMDg6MDAgSU5GTyBzdGFydGluZyBzZXJ2aWNlIGNvbm5lY3Rpb249Y29uc2Vuc3VzIGltcGw9bG9jYWxDbGllbnQgbW9kdWxlPWFiY2ktY2xpZW50IHNlcnZpY2U9bG9jYWxDbGllbnQKMjAyMi0wNy0xNlQxMzo1NTo1OSswODowMCBJTkZPIHN0YXJ0aW5nIHNlcnZpY2UgaW1wbD1FdmVudEJ1cyBtb2R1bGU9ZXZlbnRzIHNlcnZpY2U9RXZlbnRCdXMKMjAyMi0wNy0xNlQxMzo1NTo1OSswODowMCBJTkZPIHN0YXJ0aW5nIHNlcnZpY2UgaW1wbD1QdWJTdWIgbW9kdWxlPXB1YnN1YiBzZXJ2aWNlPVB1YlN1YgoyMDIyLTA3LTE2VDEzOjU1OjU5KzA4OjAwIElORk8gc3RhcnRpbmcgc2VydmljZSBpbXBsPUluZGV4ZXJTZXJ2aWNlIG1vZHVsZT10eGluZGV4IHNlcnZpY2U9SW5kZXhlclNlcnZpY2UKMjAyMi0wNy0xNlQxMzo1NTo1OSswODowMCBJTkZPIEFCQ0kgSGFuZHNoYWtlIEFwcCBJbmZvIGhhc2g9IGhlaWdodD0wIG1vZHVsZT1jb25zZW5zdXMgcHJvdG9jb2wtdmVyc2lvbj0wIHNvZnR3YXJlLXZlcnNpb249CjIwMjItMDctMTZUMTM6NTU6NTkrMDg6MDAgSU5GTyBBQkNJIFJlcGxheSBCbG9ja3MgYXBwSGVpZ2h0PTAgbW9kdWxlPWNvbnNlbnN1cyBzdGF0ZUhlaWdodD0wIHN0b3JlSGVpZ2h0PTAKMjAyMi0wNy0xNlQxMzo1NTo1OSswODowMCBJTkZPIENvbXBsZXRlZCBBQkNJIEhhbmRzaGFrZSAtIFRlbmRlcm1pbnQgYW5kIEFwcCBhcmUgc3luY2VkIGFwcEhhc2g9IGFwcEhlaWdodD0wIG1vZHVsZT1jb25zZW5zdXMKMjAyMi0wNy0xNlQxMzo1NTo1OSswODowMCBJTkZPIFZlcnNpb24gaW5mbyBibG9jaz0xMSBtb2RlPXZhbGlkYXRvciBwMnA9OCB0bVZlcnNpb249MC4zNS44Cg=="}}),e._v(" "),l("p",[e._v("Let's try sending a transaction. Open another terminal and execute the below command.")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"sh",base64:"JCBjdXJsIC1zICdsb2NhbGhvc3Q6MjY2NTcvYnJvYWRjYXN0X3R4X2NvbW1pdD90eD0mcXVvdDt0ZW5kZXJtaW50PXJvY2tzJnF1b3Q7Jwp7CiAgLi4uCiAgJnF1b3Q7cmVzdWx0JnF1b3Q7OiB7CiAgICAmcXVvdDtjaGVja190eCZxdW90OzogewogICAgICAuLi4KICAgICAgJnF1b3Q7Z2FzX3dhbnRlZCZxdW90OzogJnF1b3Q7MSZxdW90OywKICAgICAgLi4uCiAgICB9LAogICAgJnF1b3Q7ZGVsaXZlcl90eCZxdW90Ozogey4uLn0sCiAgICAmcXVvdDtoYXNoJnF1b3Q7OiAmcXVvdDsxQjNDNUExMDkzREI5NTJDMzMxQjE3NDlBMjFEQ0NCQjBGNkM3RjRFMDA1NUNEMDREMTYzNDY0NzJGQzYwRUM2JnF1b3Q7LAogICAgJnF1b3Q7aGVpZ2h0JnF1b3Q7OiAmcXVvdDs5MSZxdW90OwogIH0KfQo="}}),e._v(" "),l("p",[e._v("Response should contain the height where this transaction was committed.")]),e._v(" "),l("p",[e._v("Let's check if the given key now exists and its value:")]),e._v(" "),l("tm-code-block",{staticClass:"codeblock",attrs:{language:"sh",base64:"JCBjdXJsIC1zICdsb2NhbGhvc3Q6MjY2NTcvYWJjaV9xdWVyeT9kYXRhPSZxdW90O3RlbmRlcm1pbnQmcXVvdDsnCnsKICAuLi4KICAmcXVvdDtyZXN1bHQmcXVvdDs6IHsKICAgICZxdW90O3Jlc3BvbnNlJnF1b3Q7OiB7CiAgICAgICZxdW90O2NvZGUmcXVvdDs6IDAsCiAgICAgICZxdW90O2xvZyZxdW90OzogJnF1b3Q7ZXhpc3RzJnF1b3Q7LAogICAgICAmcXVvdDtpbmZvJnF1b3Q7OiAmcXVvdDsmcXVvdDssCiAgICAgICZxdW90O2luZGV4JnF1b3Q7OiAmcXVvdDswJnF1b3Q7LAogICAgICAmcXVvdDtrZXkmcXVvdDs6ICZxdW90O2RHVnVaR1Z5YldsdWRBPT0mcXVvdDssCiAgICAgICZxdW90O3ZhbHVlJnF1b3Q7OiAmcXVvdDtjbTlqYTNNPSZxdW90OywKICAgICAgJnF1b3Q7cHJvb2ZPcHMmcXVvdDs6IG51bGwsCiAgICAgICZxdW90O2hlaWdodCZxdW90OzogJnF1b3Q7MCZxdW90OywKICAgICAgJnF1b3Q7Y29kZXNwYWNlJnF1b3Q7OiAmcXVvdDsmcXVvdDsKICAgIH0KICB9Cn0K"}}),e._v(" "),l("p",[l("code",[e._v("dGVuZGVybWludA==")]),e._v(" and "),l("code",[e._v("cm9ja3M=")]),e._v(' are the base64-encoding of the ASCII of\n"tendermint" and "rocks" accordingly.')]),e._v(" "),l("h2",{attrs:{id:"outro"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#outro"}},[e._v("#")]),e._v(" Outro")]),e._v(" "),l("p",[e._v("I hope everything went smoothly and your first, but hopefully not the last,\nTendermint Core application is up and running. If not, please "),l("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/new/choose",target:"_blank",rel:"noopener noreferrer"}},[e._v("open an issue on\nGithub"),l("OutboundLink")],1),e._v(". To dig\ndeeper, read "),l("a",{attrs:{href:"https://docs.tendermint.com/master/",target:"_blank",rel:"noopener noreferrer"}},[e._v("the docs"),l("OutboundLink")],1),e._v(".")])],1)}),[],!1,null,null,null);t.default=a.exports}}]);