from pathlib import Path
root=Path(__file__).resolve().parent
three=(root/'vendor/three.cjs').read_text()
engine='/* Three.js r160 · MIT · license included at end of document. */\nvar THREE=(()=>{const exports={};\n'+three+'\nreturn exports;})();'
html=(root/'src/index.template.html').read_text()
for token,path in [('STYLE','style.css'),('CHEMISTRY','chemistry.js'),('APP','app.js')]:
    html=html.replace('/*__'+token+'__*/',(root/'src'/path).read_text().replace('</script','<\\/script'))
html=html.replace('/*__ENGINE__*/',engine.replace('</script','<\\/script'))
html+='\n<!-- Third-party license:\n'+(root/'vendor/THREE-LICENSE.txt').read_text()+'\n-->\n'
(root/'index.html').write_text(html)
out=root.parent/'元素之间·三维化学实验室.html'
out.write_text(html)
print(f'{out}\n{out.stat().st_size:,} bytes; all scripts, styles, textures and engine are embedded.')
