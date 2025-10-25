const out = id => document.getElementById(id);
const render = (obj) => out('output').textContent = JSON.stringify(obj, null, 2);

document.getElementById('btnPing').addEventListener('click', async () => {
  try {
    const r = await fetch('/api/ping');
    render(await r.json());
  } catch (e) { render({error: e.message}) }
});

document.getElementById('btnItems').addEventListener('click', async () => {
  try {
    const r = await fetch('/api/items');
    render(await r.json());
  } catch (e) { render({error: e.message}) }
});

document.getElementById('btnEcho').addEventListener('click', async () => {
  try {
    const payload = JSON.parse(out('payload').value);
    const r = await fetch('/api/echo', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    render(await r.json());
  } catch (e) { render({error: e.message}) }
});
