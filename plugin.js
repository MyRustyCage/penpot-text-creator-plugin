console.log("[Plugin] Loading...");penpot.ui.open("Simple Text Creator","",{width:400,height:300});console.log("[Plugin] UI window opened, waiting for it to load...");setTimeout(()=>{console.log("[Plugin] Sending ready signal now"),penpot.ui.sendMessage({type:"plugin-ready"})},500);penpot.ui.onMessage(r=>{const o=r;if(console.log("[Plugin] Received message from UI:",o.type),o.type==="create-text"&&o.content){const s=o.content;console.log("[Plugin] Creating text with penpot.createText():",s);try{const e=penpot.createText(s);if(!e)throw new Error("createText returned null");console.log("[Plugin] Text object created, type:",e.type),console.log("[Plugin] Configuring properties immediately...");const t=penpot.viewport?.center?.x||100,n=penpot.viewport?.center?.y||100;e.resize(200,50),e.x=t,e.y=n,e.growType="auto-width",e.fontSize="16",e.fontFamily="Work Sans",e.fontWeight="400",e.fontStyle="normal",e.lineHeight="1.2","fills"in e&&(e.fills=[{fillColor:"#000000",fillOpacity:1}]),e.name="Text",console.log("[Plugin] ✓ Text created and configured successfully!"),console.log("[Plugin] Text properties:",{id:e.id,x:e.x,y:e.y,width:e.width,height:e.height,growType:e.growType}),penpot.ui.sendMessage({type:"success",message:`✓ Text created successfully: "${s}"`})}catch(e){const t=e;console.error("[Plugin] ❌ Error creating text:",t),console.error("[Plugin] Error type:",t.name),console.error("[Plugin] Error message:",t.message);const n=t.message||String(t);n==="check error"?penpot.ui.sendMessage({type:"error",message:`❌ KNOWN BUG: Text validation fails in self-hosted Penpot 2.10

This works on penpot.app but fails on self-hosted Docker.

WORKAROUND:
1. Press T key to create text manually
2. Type your text
3. The plugin can then modify it

Please report this bug:
https://github.com/penpot/penpot/issues

Reference: Plugin API createText() fails validation in self-hosted 2.10`,stack:t.stack||""}):penpot.ui.sendMessage({type:"error",message:`Error: ${n}`,stack:t.stack||""})}}});console.log("[Plugin] Message listener registered");
