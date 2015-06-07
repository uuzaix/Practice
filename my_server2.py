import socket
import sys

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR,1)

server_address = ('localhost', 8005)
print 'starting up on %s port %s' % server_address
sock.bind(server_address)

# Listen for incoming connections
sock.listen(1)

# Wait for a connection
print 'waiting for a connection'
connection, client_address = sock.accept()
print 'connection from', client_address

# Read from socket
data = connection.makefile()
status = data.readline()

# Check the request and remember the path
if status[:3] == 'GET':
	list_data = status.split()
	path = list_data[1]
	message = "Hello, %s" % path
else:
	raise Exception("bad request")

# Find the end of request
for line in data:
	if line == '\r\n':
		break

#Send the message back
data.writelines(['HTTP/1.1 200 OK\n', '\n', message])

connection.close()

