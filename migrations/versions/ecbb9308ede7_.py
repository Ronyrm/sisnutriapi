"""empty message

Revision ID: ecbb9308ede7
Revises: b0716db1a94c
Create Date: 2021-04-11 13:52:12.682381

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ecbb9308ede7'
down_revision = 'b0716db1a94c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('alimentos', sa.Column('idpessoa', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'alimentos', 'pessoa', ['idpessoa'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'alimentos', type_='foreignkey')
    op.drop_column('alimentos', 'idpessoa')
    # ### end Alembic commands ###
