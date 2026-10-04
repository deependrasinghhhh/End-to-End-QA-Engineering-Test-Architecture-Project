// Admin Backoffice Interactions

function updateOrderStatus(orderId) {
  const newStatus = prompt('Enter new order status (Processing, Complete, Cancelled):', 'Complete');
  if (!newStatus) return;
  fetch('/api/admin/orders/' + orderId + '/status', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus })
  }).then(() => {
    alert('Order status updated to ' + newStatus);
    window.location.reload();
  });
}

function openProductEdit(id, name, price, stock) {
  const newPrice = prompt(`Edit price for ${name}:`, price);
  if (newPrice !== null) {
    alert(`Product ${name} updated with price $${newPrice}`);
    window.location.reload();
  }
}
