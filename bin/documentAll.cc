#include <node.h>
namespace documentAll {

using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::ObjectTemplate;
using v8::String;
using v8::Value;
using v8::Null;
using v8::Array;

void MyFunctionCallback(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(Null(isolate));
}

void GetDocumentAll(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  Local<ObjectTemplate> obj_template = ObjectTemplate::New(isolate);
  obj_template->MarkAsUndetectable();
  obj_template->SetCallAsFunctionHandler(MyFunctionCallback);
  Local<Object> obj = obj_template->NewInstance(context).ToLocalChecked();
  if (args.Length() > 0 && args[0]->IsObject()) {
    Local<Object> argObj = args[0]->ToObject(context).ToLocalChecked();
    Local<Array> propertyNames = argObj->GetPropertyNames(context).ToLocalChecked();
    for (uint32_t i = 0; i < propertyNames->Length(); ++i) {
      Local<Value> key = propertyNames->Get(context, i).ToLocalChecked();
      Local<Value> value = argObj->Get(context, key).ToLocalChecked();
      (void)obj->Set(context, key, value);
    }
  }
  args.GetReturnValue().Set(obj);
}

void Init(Local<Object> exports, Local<Object> module) {
  Isolate* isolate = exports->GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  Local<FunctionTemplate> method_template = FunctionTemplate::New(isolate, GetDocumentAll);
  exports->Set(context, String::NewFromUtf8(isolate, "getDocumentAll").ToLocalChecked(), method_template->GetFunction(context).ToLocalChecked()).FromJust();
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
}

