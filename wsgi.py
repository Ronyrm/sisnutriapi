import sys
import os

from App import app as application


sys.path.append(os.path.dirname(__file__))


if __name__ == '__main__':
    print('Execute')
    application.run()