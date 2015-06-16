import socket
import sys

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR,1)

server_address = ('localhost', 8000)
print 'starting up on %s port %s' % server_address
sock.bind(server_address)

# Listen for incoming connections
sock.listen(1)

while True:
	# Wait for a connection
	print 'waiting for a connection'
	connection, client_address = sock.accept()

	try:
		print 'connection from', client_address
		while True:
			data = connection.recv(4096)
			print 'received "%s"' % data
			if data:
				if data[:3] == 'GET':
					list_data = data.split()
					path = list_data[1]
					message = "Hello, %s" % path			
					connection.send(message)

				break

			else:
				print 'no more data from', client_address
				break
            
	finally:
        	# Clean up the connection
        	connection.close()
